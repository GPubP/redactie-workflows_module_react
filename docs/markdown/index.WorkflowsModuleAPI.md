# Interface: WorkflowsModuleAPI

[index](../wiki/index).WorkflowsModuleAPI

## Table of contents

### Properties

- [hooks](../wiki/index.WorkflowsModuleAPI#hooks-1)
- [store](../wiki/index.WorkflowsModuleAPI#store-1)

## Properties

### hooks

• **hooks**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `usePaginatedWorkflowStatuses` | `UsePaginatedWorkflowStatuses` |
| `useWorkflow` | `UseWorkflow` |

#### Defined in

lib/workflows.types.ts:58

___

### store

• **store**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `workflows` | { `facade`: `Pick`<`WorkflowsFacade`, ``"getWorkflow"``\>  } |
| `workflows.facade` | `Pick`<`WorkflowsFacade`, ``"getWorkflow"``\> |

#### Defined in

lib/workflows.types.ts:53
