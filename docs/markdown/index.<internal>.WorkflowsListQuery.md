# Class: WorkflowsListQuery

[index](../wiki/index).[<internal>](../wiki/index.%3Cinternal%3E).WorkflowsListQuery

## Hierarchy

- `CacheEntityQuery`<[`WorkflowsListUIModel`](../wiki/index.%3Cinternal%3E#workflowslistuimodel-1), [`WorkflowsListState`](../wiki/index.%3Cinternal%3E#workflowsliststate-1)\>

  ↳ **`WorkflowsListQuery`**

## Table of contents

### Constructors

- [constructor](../wiki/index.%3Cinternal%3E.WorkflowsListQuery#constructor-1)

### Properties

- [detailQuery](../wiki/index.%3Cinternal%3E.WorkflowsListQuery#detailquery-1)
- [store](../wiki/index.%3Cinternal%3E.WorkflowsListQuery#store-1)
- [workflows$](../wiki/index.%3Cinternal%3E.WorkflowsListQuery#workflows$-1)

### Methods

- [getIsFetching](../wiki/index.%3Cinternal%3E.WorkflowsListQuery#getisfetching-1)
- [selectUIState](../wiki/index.%3Cinternal%3E.WorkflowsListQuery#selectuistate-1)

## Constructors

### constructor

• **new WorkflowsListQuery**(`store`, `detailQuery`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`WorkflowsListStore`](../wiki/index.%3Cinternal%3E.WorkflowsListStore) |
| `detailQuery` | [`WorkflowsDetailQuery`](../wiki/index.%3Cinternal%3E.WorkflowsDetailQuery) |

#### Overrides

CacheEntityQuery&lt;WorkflowsListUIModel, WorkflowsListState\&gt;.constructor

#### Defined in

public/lib/store/workflows/list/workflows-list.query.ts:12

## Properties

### detailQuery

• `Protected` **detailQuery**: [`WorkflowsDetailQuery`](../wiki/index.%3Cinternal%3E.WorkflowsDetailQuery)

___

### store

• `Protected` **store**: [`WorkflowsListStore`](../wiki/index.%3Cinternal%3E.WorkflowsListStore)

#### Inherited from

CacheEntityQuery.store

___

### workflows$

• **workflows$**: `Observable`<[`Workflow`](../wiki/index.%3Cinternal%3E.Workflow)[]\>

#### Defined in

public/lib/store/workflows/list/workflows-list.query.ts:16

## Methods

### getIsFetching

▸ **getIsFetching**(): `boolean`

#### Returns

`boolean`

#### Defined in

public/lib/store/workflows/list/workflows-list.query.ts:18

___

### selectUIState

▸ **selectUIState**(): `Observable`<[`WorkflowsListUIModel`](../wiki/index.%3Cinternal%3E#workflowslistuimodel-1)\>

#### Returns

`Observable`<[`WorkflowsListUIModel`](../wiki/index.%3Cinternal%3E#workflowslistuimodel-1)\>

#### Defined in

public/lib/store/workflows/list/workflows-list.query.ts:22
