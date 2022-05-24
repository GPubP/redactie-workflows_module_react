# Class: WorkflowsFacade

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).WorkflowsFacade

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.WorkflowsFacade#constructor-1)

### Properties

- [UIState$](../wiki/index.%3Cinternal%3E.WorkflowsFacade#uistate$-1)
- [detailQuery](../wiki/index.%3Cinternal%3E.WorkflowsFacade#detailquery-1)
- [detailStore](../wiki/index.%3Cinternal%3E.WorkflowsFacade#detailstore-1)
- [isFetching$](../wiki/index.%3Cinternal%3E.WorkflowsFacade#isfetching$-1)
- [listError$](../wiki/index.%3Cinternal%3E.WorkflowsFacade#listerror$-1)
- [listPaginator](../wiki/index.%3Cinternal%3E.WorkflowsFacade#listpaginator-1)
- [listQuery](../wiki/index.%3Cinternal%3E.WorkflowsFacade#listquery-1)
- [listStore](../wiki/index.%3Cinternal%3E.WorkflowsFacade#liststore-1)
- [service](../wiki/index.%3Cinternal%3E.WorkflowsFacade#service-1)
- [workflows$](../wiki/index.%3Cinternal%3E.WorkflowsFacade#workflows$-1)

### Methods

- [activateWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#activateworkflow-1)
- [createSiteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#createsiteworkflow-1)
- [createWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#createworkflow-1)
- [deactivateWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#deactivateworkflow-1)
- [deleteSiteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#deletesiteworkflow-1)
- [deleteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#deleteworkflow-1)
- [getIsFetching](../wiki/index.%3Cinternal%3E.WorkflowsFacade#getisfetching-1)
- [getSiteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#getsiteworkflow-1)
- [getSiteWorkflowsPaginated](../wiki/index.%3Cinternal%3E.WorkflowsFacade#getsiteworkflowspaginated-1)
- [getWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#getworkflow-1)
- [getWorkflowsPaginated](../wiki/index.%3Cinternal%3E.WorkflowsFacade#getworkflowspaginated-1)
- [hasWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#hasworkflow-1)
- [selectWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#selectworkflow-1)
- [selectWorkflowUIState](../wiki/index.%3Cinternal%3E.WorkflowsFacade#selectworkflowuistate-1)
- [setIsFetching](../wiki/index.%3Cinternal%3E.WorkflowsFacade#setisfetching-1)
- [siteWorkflowOccurrences](../wiki/index.%3Cinternal%3E.WorkflowsFacade#siteworkflowoccurrences-1)
- [updateSiteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#updatesiteworkflow-1)
- [updateWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsFacade#updateworkflow-1)
- [workflowOccurrences](../wiki/index.%3Cinternal%3E.WorkflowsFacade#workflowoccurrences-1)

## Constructors

### constructor

• **new WorkflowsFacade**(`listStore`, `listQuery`, `listPaginator`, `detailStore`, `detailQuery`, `service`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `listStore` | [`WorkflowsListStore`](../wiki/index.%3Cinternal%3E.WorkflowsListStore) |
| `listQuery` | [`WorkflowsListQuery`](../wiki/index.%3Cinternal%3E.WorkflowsListQuery) |
| `listPaginator` | `PaginatorPlugin`<[`WorkflowsListState`](../wiki/index.%3Cinternal%3E#workflowsliststate-1)\> |
| `detailStore` | [`WorkflowsDetailStore`](../wiki/index.%3Cinternal%3E.WorkflowsDetailStore) |
| `detailQuery` | [`WorkflowsDetailQuery`](../wiki/index.%3Cinternal%3E.WorkflowsDetailQuery) |
| `service` | [`WorkflowsApiService`](../wiki/index.%3Cinternal%3E.WorkflowsApiService) |

#### Defined in

public/lib/store/workflows/workflows.facade.ts:45

## Properties

### UIState$

• `Readonly` **UIState$**: `Observable`<[`WorkflowsListUIModel`](../wiki/index.%3Cinternal%3E#workflowslistuimodel-1)\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:58

___

### detailQuery

• `Protected` **detailQuery**: [`WorkflowsDetailQuery`](../wiki/index.%3Cinternal%3E.WorkflowsDetailQuery)

___

### detailStore

• `Protected` **detailStore**: [`WorkflowsDetailStore`](../wiki/index.%3Cinternal%3E.WorkflowsDetailStore)

___

### isFetching$

• `Readonly` **isFetching$**: `Observable`<`boolean`\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:57

___

### listError$

• `Readonly` **listError$**: `Observable`<`any`\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:56

___

### listPaginator

• **listPaginator**: `PaginatorPlugin`<[`WorkflowsListState`](../wiki/index.%3Cinternal%3E#workflowsliststate-1)\>

___

### listQuery

• `Protected` **listQuery**: [`WorkflowsListQuery`](../wiki/index.%3Cinternal%3E.WorkflowsListQuery)

___

### listStore

• `Protected` **listStore**: [`WorkflowsListStore`](../wiki/index.%3Cinternal%3E.WorkflowsListStore)

___

### service

• `Protected` **service**: [`WorkflowsApiService`](../wiki/index.%3Cinternal%3E.WorkflowsApiService)

___

### workflows$

• `Readonly` **workflows$**: `Observable`<[`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)[]\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:55

## Methods

### activateWorkflow

▸ **activateWorkflow**(`payload`): `Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`ActivateWorkflowPayload`](../wiki/index.%3Cinternal%3E#activateworkflowpayload-1) |

#### Returns

`Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:487

___

### createSiteWorkflow

▸ **createSiteWorkflow**(`siteId`, `payload`, `options?`): `Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteId` | `string` |
| `payload` | [`CreateWorkflowPayload`](../wiki/index.%3Cinternal%3E#createworkflowpayload-1) |
| `options` | [`CreateWorkflowsPayloadOptions`](../wiki/index.%3Cinternal%3E.CreateWorkflowsPayloadOptions) |

#### Returns

`Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:282

___

### createWorkflow

▸ **createWorkflow**(`payload`, `options?`): `Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`CreateWorkflowPayload`](../wiki/index.%3Cinternal%3E#createworkflowpayload-1) |
| `options` | [`CreateWorkflowsPayloadOptions`](../wiki/index.%3Cinternal%3E.CreateWorkflowsPayloadOptions) |

#### Returns

`Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:243

___

### deactivateWorkflow

▸ **deactivateWorkflow**(`payload`): `Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`ActivateWorkflowPayload`](../wiki/index.%3Cinternal%3E#activateworkflowpayload-1) |

#### Returns

`Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:523

___

### deleteSiteWorkflow

▸ **deleteSiteWorkflow**(`siteId`, `payload`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteId` | `string` |
| `payload` | [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1) |
| `options` | [`CreateWorkflowsPayloadOptions`](../wiki/index.%3Cinternal%3E.CreateWorkflowsPayloadOptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:451

___

### deleteWorkflow

▸ **deleteWorkflow**(`payload`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1) |
| `options` | [`CreateWorkflowsPayloadOptions`](../wiki/index.%3Cinternal%3E.CreateWorkflowsPayloadOptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:416

___

### getIsFetching

▸ **getIsFetching**(): `boolean`

#### Returns

`boolean`

#### Defined in

public/lib/store/workflows/workflows.facade.ts:63

___

### getSiteWorkflow

▸ **getSiteWorkflow**(`siteId`, `workflowUuid`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteId` | `string` |
| `workflowUuid` | `string` |
| `options?` | [`GetWorkflowPayloadOptions`](../wiki/index.%3Cinternal%3E.GetWorkflowPayloadOptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:210

___

### getSiteWorkflowsPaginated

▸ **getSiteWorkflowsPaginated**(`siteId`, `searchParams`, `options?`): `Observable`<`PaginationResponse`<[`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteId` | `string` |
| `searchParams` | `SearchParams` |
| `options?` | [`GetWorkflowsPaginatedPayloadOptions`](../wiki/index.%3Cinternal%3E.GetWorkflowsPaginatedPayloadOptions) |

#### Returns

`Observable`<`PaginationResponse`<[`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)\>\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:125

___

### getWorkflow

▸ **getWorkflow**(`workflowUuid`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |
| `options?` | [`GetWorkflowPayloadOptions`](../wiki/index.%3Cinternal%3E.GetWorkflowPayloadOptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:178

___

### getWorkflowsPaginated

▸ **getWorkflowsPaginated**(`searchParams`, `options?`): `Observable`<`PaginationResponse`<[`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchParams` | `SearchParams` |
| `options?` | [`GetWorkflowsPaginatedPayloadOptions`](../wiki/index.%3Cinternal%3E.GetWorkflowsPaginatedPayloadOptions) |

#### Returns

`Observable`<`PaginationResponse`<[`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)\>\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:78

___

### hasWorkflow

▸ **hasWorkflow**(`workflowUuid`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |

#### Returns

`boolean`

#### Defined in

public/lib/store/workflows/workflows.facade.ts:174

___

### selectWorkflow

▸ **selectWorkflow**(`workflowUuid`): `Observable`<`undefined` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |

#### Returns

`Observable`<`undefined` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:68

___

### selectWorkflowUIState

▸ **selectWorkflowUIState**(`workflowUuid?`): `Observable`<`undefined` \| `CacheEntityUI`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid?` | `string` |

#### Returns

`Observable`<`undefined` \| `CacheEntityUI`\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:71

___

### setIsFetching

▸ **setIsFetching**(`isFetching?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `isFetching` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

public/lib/store/workflows/workflows.facade.ts:60

___

### siteWorkflowOccurrences

▸ **siteWorkflowOccurrences**(`siteId`, `workflowUuid`): `Promise`<{ `data`: `ContentTypeDetailResponse`[] ; `error`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteId` | `string` |
| `workflowUuid` | `string` |

#### Returns

`Promise`<{ `data`: `ContentTypeDetailResponse`[] ; `error`: `any`  }\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:578

___

### updateSiteWorkflow

▸ **updateSiteWorkflow**(`siteId`, `payload`, `alertInput`, `isTransitionUpdate?`): `Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `siteId` | `string` | `undefined` |
| `payload` | [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1) | `undefined` |
| `alertInput` | `string` | `undefined` |
| `isTransitionUpdate` | `boolean` | `false` |

#### Returns

`Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:368

___

### updateWorkflow

▸ **updateWorkflow**(`payload`, `alertInput`, `isTransitionUpdate?`): `Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1) | `undefined` |
| `alertInput` | `string` | `undefined` |
| `isTransitionUpdate` | `boolean` | `false` |

#### Returns

`Promise`<`void` \| [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:322

___

### workflowOccurrences

▸ **workflowOccurrences**(`workflowUuid`): `Promise`<{ `data`: `SiteResponse`[] ; `error`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |

#### Returns

`Promise`<{ `data`: `SiteResponse`[] ; `error`: `any`  }\>

#### Defined in

public/lib/store/workflows/workflows.facade.ts:559
