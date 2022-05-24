# Class: WorkflowsApiService

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).WorkflowsApiService

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.WorkflowsApiService#constructor-1)

### Methods

- [activateWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#activateworkflow-1)
- [createSiteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#createsiteworkflow-1)
- [createWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#createworkflow-1)
- [deactivateWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#deactivateworkflow-1)
- [deleteSiteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#deletesiteworkflow-1)
- [deleteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#deleteworkflow-1)
- [getSiteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#getsiteworkflow-1)
- [getSiteWorkflows](../wiki/index.%3Cinternal%3E.WorkflowsApiService#getsiteworkflows-1)
- [getWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#getworkflow-1)
- [getWorkflows](../wiki/index.%3Cinternal%3E.WorkflowsApiService#getworkflows-1)
- [siteWorkflowOccurrences](../wiki/index.%3Cinternal%3E.WorkflowsApiService#siteworkflowoccurrences-1)
- [updateSiteWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#updatesiteworkflow-1)
- [updateWorkflow](../wiki/index.%3Cinternal%3E.WorkflowsApiService#updateworkflow-1)
- [workflowOccurrences](../wiki/index.%3Cinternal%3E.WorkflowsApiService#workflowoccurrences-1)

## Constructors

### constructor

• **new WorkflowsApiService**()

## Methods

### activateWorkflow

▸ **activateWorkflow**(`workflowUuid`): `Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |

#### Returns

`Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:87

___

### createSiteWorkflow

▸ **createSiteWorkflow**(`workflow`, `siteId`): `Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflow` | [`CreateWorkflowPayload`](../wiki/index.%3Cinternal%3E#createworkflowpayload-1) |
| `siteId` | `string` |

#### Returns

`Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:42

___

### createWorkflow

▸ **createWorkflow**(`workflow`): `Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflow` | [`CreateWorkflowPayload`](../wiki/index.%3Cinternal%3E#createworkflowpayload-1) |

#### Returns

`Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:38

___

### deactivateWorkflow

▸ **deactivateWorkflow**(`workflowUuid`): `Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |

#### Returns

`Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:91

___

### deleteSiteWorkflow

▸ **deleteSiteWorkflow**(`workflowUuid`, `siteId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |
| `siteId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:81

___

### deleteWorkflow

▸ **deleteWorkflow**(`workflowUuid`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:77

___

### getSiteWorkflow

▸ **getSiteWorkflow**(`workflowUuid`, `siteId`): `Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |
| `siteId` | `string` |

#### Returns

`Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:55

___

### getSiteWorkflows

▸ **getSiteWorkflows**(`searchParams?`, `siteId`): `Promise`<[`WorkflowsResponse`](../wiki/index.%3Cinternal%3E#workflowsresponse-1)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `searchParams` | `SearchParams` | `DEFAULT_WORKFLOWS_SEARCH_PARAMS` |
| `siteId` | `string` | `undefined` |

#### Returns

`Promise`<[`WorkflowsResponse`](../wiki/index.%3Cinternal%3E#workflowsresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:27

___

### getWorkflow

▸ **getWorkflow**(`workflowUuid`): `Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |

#### Returns

`Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:51

___

### getWorkflows

▸ **getWorkflows**(`searchParams?`): `Promise`<[`WorkflowsResponse`](../wiki/index.%3Cinternal%3E#workflowsresponse-1)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `searchParams` | `SearchParams` | `DEFAULT_WORKFLOWS_SEARCH_PARAMS` |

#### Returns

`Promise`<[`WorkflowsResponse`](../wiki/index.%3Cinternal%3E#workflowsresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:19

___

### siteWorkflowOccurrences

▸ **siteWorkflowOccurrences**(`siteId`, `workflowUuid`): `Promise`<{ `_embedded`: { `contentTypes`: `ContentTypeDetailResponse`[]  }  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `siteId` | `string` |
| `workflowUuid` | `string` |

#### Returns

`Promise`<{ `_embedded`: { `contentTypes`: `ContentTypeDetailResponse`[]  }  }\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:99

___

### updateSiteWorkflow

▸ **updateSiteWorkflow**(`workflow`, `siteId`): `Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflow` | [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1) |
| `siteId` | `string` |

#### Returns

`Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:66

___

### updateWorkflow

▸ **updateWorkflow**(`workflow`): `Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflow` | [`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1) |

#### Returns

`Promise`<[`WorkflowDetailResponse`](../wiki/index.%3Cinternal%3E#workflowdetailresponse-1)\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:62

___

### workflowOccurrences

▸ **workflowOccurrences**(`workflowUuid`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workflowUuid` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

public/lib/services/workflows/workflows.service.ts:95
