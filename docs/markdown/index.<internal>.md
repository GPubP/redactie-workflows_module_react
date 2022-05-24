# Namespace: <internal\>

[index](../wiki/index).<internal>

## Table of contents

### Enumeration members

- [userHasRole](../wiki/index.%3Cinternal%3E#userhasrole-1)

### Classes

- [WorkflowsApiService](../wiki/index.%3Cinternal%3E.WorkflowsApiService)
- [WorkflowsDetailQuery](../wiki/index.%3Cinternal%3E.WorkflowsDetailQuery)
- [WorkflowsDetailStore](../wiki/index.%3Cinternal%3E.WorkflowsDetailStore)
- [WorkflowsFacade](../wiki/index.%3Cinternal%3E.WorkflowsFacade)
- [WorkflowsListQuery](../wiki/index.%3Cinternal%3E.WorkflowsListQuery)
- [WorkflowsListStore](../wiki/index.%3Cinternal%3E.WorkflowsListStore)

### Interfaces

- [CreateWorkflowsPayloadOptions](../wiki/index.%3Cinternal%3E.CreateWorkflowsPayloadOptions)
- [GetWorkflowPayloadOptions](../wiki/index.%3Cinternal%3E.GetWorkflowPayloadOptions)
- [GetWorkflowsPaginatedPayloadOptions](../wiki/index.%3Cinternal%3E.GetWorkflowsPaginatedPayloadOptions)
- [Workflow](../wiki/index.%3Cinternal%3E.Workflow)
- [WorkflowData](../wiki/index.%3Cinternal%3E.WorkflowData)
- [WorkflowMeta](../wiki/index.%3Cinternal%3E.WorkflowMeta)
- [WorkflowPopulatedTransitionTarget](../wiki/index.%3Cinternal%3E.WorkflowPopulatedTransitionTarget)
- [WorkflowRequirement](../wiki/index.%3Cinternal%3E.WorkflowRequirement)
- [WorkflowStatus](../wiki/index.%3Cinternal%3E.WorkflowStatus)
- [WorkflowStatusData](../wiki/index.%3Cinternal%3E.WorkflowStatusData)
- [WorkflowStatusMeta](../wiki/index.%3Cinternal%3E.WorkflowStatusMeta)
- [WorkflowTransition](../wiki/index.%3Cinternal%3E.WorkflowTransition)

### Type aliases

- [ActivateWorkflowPayload](../wiki/index.%3Cinternal%3E#activateworkflowpayload-1)
- [CreateWorkflowPayload](../wiki/index.%3Cinternal%3E#createworkflowpayload-1)
- [UsePaginatedWorkflowStatuses](../wiki/index.%3Cinternal%3E#usepaginatedworkflowstatuses-1)
- [UseWorkflow](../wiki/index.%3Cinternal%3E#useworkflow-1)
- [WorkflowDetailResponse](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)
- [WorkflowDetailUIModel](../wiki/index.%3Cinternal%3E#workflowdetailuimodel-1)
- [WorkflowStatusesListModel](../wiki/index.%3Cinternal%3E#workflowstatuseslistmodel-1)
- [WorkflowsDetailState](../wiki/index.%3Cinternal%3E#workflowsdetailstate-1)
- [WorkflowsDetailUIState](../wiki/index.%3Cinternal%3E#workflowsdetailuistate-1)
- [WorkflowsListModel](../wiki/index.%3Cinternal%3E#workflowslistmodel-1)
- [WorkflowsListState](../wiki/index.%3Cinternal%3E#workflowsliststate-1)
- [WorkflowsListUIModel](../wiki/index.%3Cinternal%3E#workflowslistuimodel-1)
- [WorkflowsResponse](../wiki/index.%3Cinternal%3E#workflowsresponse-1)

## Enumeration members

### userHasRole

• **userHasRole**: `Object` = `"userHasRole"`

#### Defined in

public/lib/services/workflows/workflows.service.types.ts:4

## Type aliases

### ActivateWorkflowPayload

Ƭ **ActivateWorkflowPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `uuid` | `string` |

#### Defined in

public/lib/services/workflows/workflows.service.types.ts:100

___

### CreateWorkflowPayload

Ƭ **CreateWorkflowPayload**: `Object`

=========================
Payload types
- Define all payload interfaces
=========================

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | { `description`: `string` ; `name`: `string`  } |
| `data.description` | `string` |
| `data.name` | `string` |

#### Defined in

public/lib/services/workflows/workflows.service.types.ts:90

___

### UsePaginatedWorkflowStatuses

Ƭ **UsePaginatedWorkflowStatuses**: (`sitesSearchParams`: `SearchParams`, `options?`: { `clearCache?`: `boolean` ; `siteId?`: `string` ; `sparse?`: `boolean`  }) => { `error`: `any` \| ``null`` ; `loading`: `boolean` ; `pagination`: `PaginationResponse`<[`WorkflowStatusesListModel`](../wiki/index.%3Cinternal%3E#workflowstatuseslistmodel-1)\> \| ``null`` ; `refreshCurrentPage`: () => `void`  }

#### Type declaration

▸ (`sitesSearchParams`, `options?`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `sitesSearchParams` | `SearchParams` |
| `options?` | `Object` |
| `options.clearCache?` | `boolean` |
| `options.siteId?` | `string` |
| `options.sparse?` | `boolean` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `error` | `any` \| ``null`` |
| `loading` | `boolean` |
| `pagination` | `PaginationResponse`<[`WorkflowStatusesListModel`](../wiki/index.%3Cinternal%3E#workflowstatuseslistmodel-1)\> \| ``null`` |
| `refreshCurrentPage` | () => `void` |

#### Defined in

public/lib/hooks/usePaginatedWorkflowStatuses/usePaginatedWorkflowStatuses.types.ts:6

___

### UseWorkflow

Ƭ **UseWorkflow**: (`workflowUuid?`: `string`, `siteId?`: `string`) => [[`WorkflowDetailModel`](../wiki/index#workflowdetailmodel-1) \| `undefined`, [`WorkflowDetailUIModel`](../wiki/index.%3Cinternal%3E#workflowdetailuimodel-1) \| `undefined`]

#### Type declaration

▸ (`workflowUuid?`, `siteId?`): [[`WorkflowDetailModel`](../wiki/index#workflowdetailmodel-1) \| `undefined`, [`WorkflowDetailUIModel`](../wiki/index.%3Cinternal%3E#workflowdetailuimodel-1) \| `undefined`]

##### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid?` | `string` |
| `siteId?` | `string` |

##### Returns

[[`WorkflowDetailModel`](../wiki/index#workflowdetailmodel-1) \| `undefined`, [`WorkflowDetailUIModel`](../wiki/index.%3Cinternal%3E#workflowdetailuimodel-1) \| `undefined`]

#### Defined in

public/lib/hooks/useWorkflow/useWorkflow.types.ts:3

___

### WorkflowDetailResponse

Ƭ **WorkflowDetailResponse**: [`Workflow`](../wiki/index.%3Cinternal%3E.Workflow) & { `meta`: [`WorkflowMeta`](../wiki/index.%3Cinternal%3E.WorkflowMeta) ; `uuid`: `string`  }

#### Defined in

public/lib/services/workflows/workflows.service.types.ts:78

___

### WorkflowDetailUIModel

Ƭ **WorkflowDetailUIModel**: `CacheEntityUI`

#### Defined in

public/lib/store/workflows/detail/workflows-detail.model.ts:6

___

### WorkflowStatusesListModel

Ƭ **WorkflowStatusesListModel**: [`WorkflowStatus`](../wiki/index.%3Cinternal%3E.WorkflowStatus)

#### Defined in

public/lib/store/workflowStatuses/list/workflowStatuses-list.model.ts:5

___

### WorkflowsDetailState

Ƭ **WorkflowsDetailState**: `CacheEntityState`<[`WorkflowDetailModel`](../wiki/index#workflowdetailmodel-1), `string`\>

#### Defined in

public/lib/store/workflows/detail/workflows-detail.model.ts:8

___

### WorkflowsDetailUIState

Ƭ **WorkflowsDetailUIState**: `CacheEntityUIState`<[`WorkflowDetailUIModel`](../wiki/index.%3Cinternal%3E#workflowdetailuimodel-1)\>

#### Defined in

public/lib/store/workflows/detail/workflows-detail.model.ts:10

___

### WorkflowsListModel

Ƭ **WorkflowsListModel**: [`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)

#### Defined in

public/lib/store/workflows/list/workflows-list.model.ts:5

___

### WorkflowsListState

Ƭ **WorkflowsListState**: `CacheEntityState`<[`WorkflowsListModel`](../wiki/index.%3Cinternal%3E#workflowslistmodel-1), `string`\>

#### Defined in

public/lib/store/workflows/list/workflows-list.model.ts:12

___

### WorkflowsListUIModel

Ƭ **WorkflowsListUIModel**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `any` |
| `isCreating` | `boolean` |
| `isFetching` | `boolean` |

#### Defined in

public/lib/store/workflows/list/workflows-list.model.ts:6

___

### WorkflowsResponse

Ƭ **WorkflowsResponse**: `EmbeddedResponse`<[`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)\> & { `_embedded`: { `workflows`: [`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)[]  }  }

=========================
Response types
- Define all response interfaces coming from the server
=========================

#### Defined in

public/lib/services/workflows/workflows.service.types.ts:73
