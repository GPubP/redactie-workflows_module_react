import { ContentTypeAPI, ExternalTabOptions } from '@redactie/content-types-module';
import Core from '@redactie/redactie-core';

class ContentTypeConnector {
	public apiName = 'content-type-module';
	public api: ContentTypeAPI;

	constructor() {
		this.api = Core.modules.getModuleAPI<ContentTypeAPI>(this.apiName);
	}

	public get hooks(): ContentTypeAPI['hooks'] {
		return this.api.hooks;
	}

	public get contentTypesFacade(): ContentTypeAPI['store']['contentTypes']['facade'] {
		return this.api.store.contentTypes.facade;
	}

	public registerCTDetailTab(key: string, options: ExternalTabOptions): void | false {
		return this.api.registerCTDetailTab(key, options);
	}
}

const contentTypeConnector = new ContentTypeConnector();

export default contentTypeConnector;
