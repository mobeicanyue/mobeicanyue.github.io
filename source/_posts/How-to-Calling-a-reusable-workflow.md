---
title: Github Actions - workflow 如何调用另一个 workflow
tags:
  - Github
  - Github-Actions
abbrlink: dfda3314
date: 2024-06-07 12:37:58
---

{% note secondary %}
在 Github Actions 中，我们可能会有这样的需求：一个 workflow 执行满足了某个条件后，需要调用另一个 workflow 完成相应业务。

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

文档中提到如下信息：

You call a reusable workflow by using the uses keyword. Unlike when you are using actions within a workflow, you call reusable workflows directly within a job, and not from within job steps.

`jobs.<job_id>.uses`

You reference reusable workflow files using one of the following syntaxes:

- `{owner}/{repo}/.github/workflows/{filename}@{ref}` for reusable workflows in public and private repositories.
- `./.github/workflows/{filename}` for reusable workflows in the same repository.


也就是说，调用 `workflow` 有两种方式：
1. 调用本仓库的 workflow，使用 `./.github/workflows/{filename}`.
2. 调用其他仓库的 workflow，使用 `{owner}/{repo}/.github/workflows/{filename}@{ref}`.

代码示例如下：
```yaml
jobs:
  call-workflow-1-in-local-repo:
    uses: octo-org/this-repo/.github/workflows/workflow-1.yml@172239021f7ba04fe7327647b213799853a9eb89
  call-workflow-2-in-local-repo:
    uses: ./.github/workflows/workflow-2.yml
  call-workflow-in-another-repo:
    uses: octo-org/another-repo/.github/workflows/workflow.yml@v1
```

由例子可见：我们在使用 `uses:` 调用 workflow 时，需要直接在 `jobs.<job_id>.uses` 中使用，而不是在 job 的 steps 中使用。

## 3. 项目实战

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
      - uses: actions/checkout@v4

      ### 省略业务逻辑 ###

      - name: 比较版本号
        id: version-compare
        run: |
          python3 <<END
          if lxgw_version > self_version:
              os.system('echo "lxgw_newer=true" >> $GITHUB_OUTPUT')
          else:
              os.system('echo "lxgw_newer=false" >> $GITHUB_OUTPUT')
          END

    outputs:
      lxgw_newer: ${{ steps.version-compare.outputs.lxgw_newer }}

  update:
    needs: check-update
    if: ${{ needs.check-update.outputs.lxgw_newer == 'true' }}
    uses: mobeicanyue/test-font/.github/workflows/split.yml@main
    permissions:
      contents: write
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

jobs:
    split:
        runs-on: ubuntu-latest
    
        steps:
        - uses: actions/checkout@v4
    
        ### 省略业务逻辑 ###
```

这样，我们就实现了在一个 workflow 中调用另一个 workflow 的功能。
