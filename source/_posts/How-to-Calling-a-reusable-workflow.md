---
title: Github Actions - workflow 如何调用另一个 workflow
tags:
  - Github
  - Github-Actions
abbrlink: dfda3314
date: 2024-06-07 12:37:58
---

{% note secondary %}
在 Github Actions 中，我们可能会有这样的需求：一个 workflow 执行满足了某个条件后，调用另一个 workflow 完成相应业务。

本文将介绍如何在 Github Actions 的 workflow 中调用另一个 workflow.
Github 官方文档：https://docs.github.com/en/actions/using-workflows/reusing-workflows.
{% endnote %}


## 1. 创建一个可重用的 workflow

要创建一个可重用的 workflow，我们需要在`被调用的 workflow 文件`的 `on` 字段中指定 `workflow_call` 事件，如下所示：

```yaml
on:
  workflow_call:
```

这样，我们就可以在其他 workflow 中调用这个 workflow 了。


## 2. 调用 workflow

<br>
文档中提到如下信息：


---
You call a reusable workflow by using the uses keyword. Unlike when you are using actions within a workflow, you call reusable workflows directly within a job, and not from within job steps.

`jobs.<job_id>.uses`

You reference reusable workflow files using one of the following syntaxes:

- `{owner}/{repo}/.github/workflows/{filename}@{ref}` for reusable workflows in public and private repositories.
- `./.github/workflows/{filename}` for reusable workflows in the same repository.
---


也就是说，Github Action 有两种调用 `workflow` 的方式：
1. 调用本仓库的 workflow，使用 `./.github/workflows/{filename}`. 
   `./` 代表 `Github Action 的默认工作目录`。
2. 调用其他仓库的 workflow，使用 `{owner}/{repo}/.github/workflows/{filename}@{ref}`.

文档中好像还提到了 `./.github/actions` 这种路径的调用方式，和 `./.github/workflows` 类似，感兴趣的可以自行查看文档：[Using an action in the same repository as the workflow](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-using-an-action-in-the-same-repository-as-the-workflow)

<br>

示例代码如下：
```yaml
jobs:
  in-local-repo-1:
    uses: octo-org/this-repo/.github/workflows/workflow-1.yml@172239021f7ba04fe7327647b213799853a9eb89
  in-local-repo-2:
    uses: ./.github/workflows/workflow-2.yml
  in-another-repo:
    uses: octo-org/another-repo/.github/workflows/workflow.yml@v1
```

由例子可见：使用 `uses:` 调用 workflow 时，需要直接在 `jobs.<job_id>.uses` 调用，而不是在 job 的 steps 中调用。

## 3. 传递参数

如果你需要在调用 workflow 时传递参数，你可以使用 `with` 字段，如下所示：

这是调用 workflow 的文件 `workflow1.yml`:
```yaml
jobs:
  call-workflow:
    uses: octo-org/this-repo/.github/workflows/workflow.yml@main
    with:
      foo: bar
```
使用 `with` 字段传递参数，`foo` 是参数名，`bar` 是参数值。

这是被调用的 workflow 文件 `workflow2.yml`:
```yaml
on:
  workflow_call:
    inputs:
      foo:
        required: true
        type: string

jobs:
  called-workflow:
    runs-on: ubuntu-latest
    steps:
      - name: Print the input
        run: echo ${{ inputs.foo }}
```
在被调用的 workflow 文件中，在 `on.workflow_call.inputs` 中定义参数，然后在 `jobs` 中使用 `${{ inputs.foo }}` 获取参数值。

## 4. 项目实战
我们来看一个实际的例子，如何在一个 workflow 中调用另一个 workflow.

```yaml
name: Detect Update
on:
  schedule:
    - cron: "0 0 * * 1"
    # 每个星期一零点检查

jobs:
  check-update:
    runs-on: ubuntu-latest
    steps:
      ### 省略业务逻辑 ###

    outputs:
      lxgw_newer: ${{ steps.version-compare.outputs.lxgw_newer }}

  update:
    needs: check-update
    if: ${{ needs.check-update.outputs.lxgw_newer == 'true' }}
    uses: mobeicanyue/test-font/.github/workflows/split.yml@main
    permissions:
      contents: write
    with:
      lxgw_tag: ${{ needs.check-update.outputs.lxgw_tag }}
```

这是一个检查更新的 workflow，分为两个 job：`check-update` 和 `update`。`check-update` 用于检查是否有更新，`update` 用于更新。
当 `check-update` 检查到有更新时，`update` 会调用 `mobeicanyue/test-font` 仓库的 `split.yml` workflow。

需要注意：
1. 你需要在 `job` 中使用 `uses` 调用 workflow，而不是在 `steps` 中使用。
2. 如果你需要在 job 中使用 `if` 判断条件，需要在上一步的环境变量中输出到 `GITHUB_OUTPUT`，然后指定 `job` 的 `outputs`，这样才能在 `if` 中使用。
3. 如果被调用的 workflow 涉及到 push 等操作，你需要在 `uses` 中指定 `permissions: contents: write`。具体权限参考：[Assign permissions to jobs](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs).

被调用文件 `split.yml` 如下：
```yaml
name: Split

on:
  workflow_call:
    inputs:
      lxgw_tag:
        required: true
        type: string

jobs:
  split:
    runs-on: ubuntu-latest
    steps:
    ### 省略业务逻辑 ###
```

这样，我们就实现了在一个 workflow 中调用另一个 workflow 的功能。
