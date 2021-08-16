import Core, { ModuleRouteConfig } from '@redactie/redactie-core';
import { SitesModuleAPI } from '@redactie/sites-module';

class SitesConnector {
	public static apiName = 'sites-module';
	public api: SitesModuleAPI;

	constructor(api?: SitesModuleAPI) {
		if (!api) {
			throw new Error(
				`Workflows Module:
				Dependencies not found: ${SitesConnector.apiName}`
			);
		}
		this.api = api;
	}

	public registerRoutes(routes: ModuleRouteConfig): void | false {
		return this.api ? this.api.routes.register(routes) : false;
	}
}

const sitesConnector = new SitesConnector(
	Core.modules.getModuleAPI<SitesModuleAPI>(SitesConnector.apiName)
);

export default sitesConnector;
