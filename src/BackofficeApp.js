angular
    .module('BackofficeApp', ['ngMaterial', 'ngAnimate', 'toastr', 'ui.router', 'gettext', 'ngResource',
        'LocalStorageModule', 'md.data.table', 'ncy-angular-breadcrumb', 'ngFileUpload',
        'ui.tree', 'ngMessages', 'AnrModule'])
    .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
             '$httpProvider', '$breadcrumbProvider', '$provide', 'gettext', '$mdAriaProvider', '$locationProvider',
        function ($mdThemingProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider,
                  $httpProvider, $breadcrumbProvider, $provide, gettext, $mdAriaProvider, $locationProvider) {
            // Store the state provider to be allow controllers to inject their routes
            window.$stateProvider = $stateProvider;

            $mdThemingProvider.definePalette('monarcfo',{
                '50':  '#BCBEC0',
                '100': '#BCBEC0',
                '200': '#939598',
                '300': '#78909C',
                '400': '#627D8C',
                '500': '#308AA1',
                '600': '#59717C',
                '700': '#6D6F71',
                '800': '#231F20',
                '900': '#231F20',
                'A100': '#78909C',
                'A200': '#627D8C',
                'A400': '#59717C',
                'A700': '#231F20',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': '50 100 200'
                });

                $mdThemingProvider.definePalette('monarcfoAccent', {
                '50':  '#BCBEC0',
                '100': '#939598',
                '200': '#78909C',
                '300': '#627D8C',
                '400': '#59717C',
                '500': '#627D8C',
                '600': '#59717C',
                '700': '#6D6F71',
                '800': '#231F20',
                '900': '#231F20',
                'A100': '#78909C',
                'A200': '#308AA1',
                'A400': '#59717C',
                'A700': '#231F20',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': '50 100'
                });

            $mdThemingProvider.theme('default')
                .primaryPalette('monarcfo')
                .accentPalette('monarcfoAccent');

            // Keep copied with default - allow commonization of theme declarations with the front in ANR module
            $mdThemingProvider.theme('light')
                .primaryPalette('monarcfo')
                .accentPalette('monarcfoAccent');

            $urlRouterProvider.otherwise('/');

            // Globally disables all ARIA warnings.
            $mdAriaProvider.disableWarnings();

            localStorageServiceProvider
                .setStorageType('localStorage');

            $breadcrumbProvider.setOptions({
                template: '<div><span ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="false"> <md-icon>chevron_right</md-icon> </span><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></span></div>'
            });

            $locationProvider.hashPrefix('');

            $stateProvider.state('login', {
                url: "/",
                views: {
                    "main": {templateUrl: "views/login.html"}
                }
            }).state('passwordforgotten', {
                url: "/passwordforgotten/:token",
                views: {
                    "main": {templateUrl: "views/passwordforgotten.html"}
                }
            }).state('main', {
                url: "/backoffice",
                redirectTo: 'main.kb_mgmt.info_risk',
                views: {
                    "main": {templateUrl: "views/index.backoffice.html"}
                },
                ncyBreadcrumb: {
                    label: '{{"Home"|translate}}'
                }
            }).state('main.account', {
                url: "/account",
                views: {
                    "main@main": {templateUrl: "views/account.html"}
                },
                ncyBreadcrumb: {
                    label: '{{"Account"|translate}}'
                }
            }).state('main.admin', {
                url: "/admin",
                views: {},
                ncyBreadcrumb: {
   		    label: '{{"Administration"|translate}}'
                }
            }).state('main.admin.users', {
                url: "/users",
                views: {
                    "main@main": {templateUrl: "views/users.admin.html"}
                },
                ncyBreadcrumb: {
                    label: '{{"Manage users"|translate}}'
                }
            }).state('main.admin.servers', {
                url: "/servers",
                views: {
                    "main@main": {templateUrl: "views/servers.admin.html"}
                },
                ncyBreadcrumb: {
                    label: '{{"Manage servers"|translate}}'
                }
            }).state('main.admin.logs', {
                url: "/logs",
                views: {
                    "main@main": {templateUrl: "views/logs.admin.html"}
                },
                ncyBreadcrumb: {
                    label: '{{"Actions history"|translate}}'
                }
            }).state('main.client_mgmt', {
                url: "/client",
                views: {
                    "main": {templateUrl: "views/index.client_mgmt.html"}
                },
                ncyBreadcrumb: {
                    label: '{{"Client management"|translate}}'
                }
            }).state('main.kb_mgmt', {
                url: "/kb",
                redirectTo: 'main.kb_mgmt.info_risk',
                ncyBreadcrumb: {
                    label: '{{"KB management"|translate}}'
                },
            }).state('main.kb_mgmt.info_risk', {
                url: '/info/:tab/:showid',
                params: { tab: { dynamic: true, value: 'assets' },showid: { dynamic: true, value: null }},
                views: {
                    'main@main': {templateUrl: 'views/info_risk.kb_mgmt.html'}
                },
                ncyBreadcrumb: {
                    label: '{{"Information risks"|translate}}'
                }
            }).state('main.kb_mgmt.info_risk.object', {
                url: '/object/:objectId',
                views: {
                    'main@main': {templateUrl: 'views/anr/object.html'}
                },
                ncyBreadcrumb: {
                    label: '{{"Object details"|translate}}'
                }
            }).state('main.kb_mgmt.models', {
                url: '/models',
                views: {
                    'main@main': {templateUrl: 'views/models.kb_mgmt.html'}
                },
                ncyBreadcrumb: {
                    label: '{{"Models"|translate}}'
                }
            }).state('main.kb_mgmt.models.details', {
                url: '/:modelId',
                views: {
                    'main@main': {templateUrl: 'views/anr/anr.layout.html'},
                    'anr@main.kb_mgmt.models.details': {templateUrl: 'views/anr/anr.home.html'}
                },
                ncyBreadcrumb: {
                    skip: true
                }
            }).state('main.kb_mgmt.models.details.object', {
                url: '/object/:objectId',
                views: {
                    'anr@main.kb_mgmt.models.details': {templateUrl: 'views/anr/object.html'}
                },
                ncyBreadcrumb: {
                    skip: true
                }
            }).state('main.kb_mgmt.models.details.instance', {
                url: '/inst/:instId',
                views: {
                    'anr@main.kb_mgmt.models.details': {templateUrl: 'views/anr/anr.instance.html'}
                },
                ncyBreadcrumb: {
                    skip: true
                }
            }).state('main.kb_mgmt.op_risk', {
                url: '/op/:tab',
                params: { tab: { dynamic: true, value: 'tags' }},
                views: {
                    'main@main': {templateUrl: 'views/op_risk.kb_mgmt.html'}
                },
                ncyBreadcrumb: {
                    label: '{{"Operational risks"|translate}}'
                }
            }).state('main.kb_mgmt.deliveries_models', {
                url: '/deliveriesmodels',
                views: {
                    'main@main': {templateUrl: 'views/deliveries_models.kb_mgmt.html'}
                },
                ncyBreadcrumb: {
                    label: '{{"Deliverable templates"|translate}}'
                }
            }).state('main.kb_mgmt.questions', {
                url: '/questions',
                views: {
                    'main@main': {templateUrl: 'views/questions.kb_mgmt.html'}
                },
                ncyBreadcrumb: {
                    label: '{{"Questions of trends assessment"|translate}}'
                }
            }).state('main.kb_mgmt.analysis_guides', {
                url: '/guides',
                views: {
                    'main@main': {templateUrl: 'views/analysis_guides.kb_mgmt.html'}
                },
                ncyBreadcrumb: {
                    label: '{{"Helpful informations"|translate}}'
                }
            }).state('main.kb_mgmt.analysis_guides.items', {
                url: '/:guideId',
                views: {
                    'main@main': {templateUrl: 'views/items.analysis_guides.kb_mgmt.html'}
                },
                ncyBreadcrumb: {
                    label: '{{"Guide contents"|translate}}'
                }
            });

            $provide.factory('monarcHttpInter', ['$injector', function ($injector) {
                return {
                    'request': function (config) {
                        // UserService depends on $http, which causes a circular dependency inside a $http interceptor
                        var UserService = $injector.get('UserService');
                        var $http = $injector.get('$http');

                        if (!UserService.isAuthenticated()) {
                            UserService.reauthenticate();
                        }


                        if (UserService.isAuthenticated()) {
                            config.headers.token = UserService.getToken();
                        }

                        return config;
                    },

                    'responseError': function (response) {
                        let i;
                        var ErrorService = $injector.get('ErrorService');
                        var gettextCatalog = $injector.get('gettextCatalog');

                        function translateKnownErrorMessage(message) {
                            if (!message || typeof message !== 'string') {
                                return message;
                            }

                            function translateScaleType(scaleType) {
                                const scaleTypes = {
                                    'confidentiality': gettext('confidentiality'),
                                    'integrity': gettext('integrity'),
                                    'availability': gettext('availability'),
                                    'threat probability': gettext('threat probability'),
                                    'vulnerability qualification': gettext('vulnerability qualification')
                                };

                                return scaleTypes[scaleType]
                                    ? gettextCatalog.getString(scaleTypes[scaleType])
                                    : scaleType;
                            }

                            message = message.replace(
                                /The value (-?\d+) should be between one of \[([^\]]+)\]/g,
                                function (match, value, allowedValues) {
                                    return gettextCatalog.getString(
                                        gettext('The value {{value}} should be between one of [{{allowedValues}}]'),
                                        { value: value, allowedValues: allowedValues }
                                    );
                                }
                            );

                            message = message.replace(
                                /The value (-?\d+) should be between (-?\d+) and (-?\d+)\./g,
                                function (match, value, min, max) {
                                    return gettextCatalog.getString(
                                        gettext('The value {{value}} should be between {{min}} and {{max}}.'),
                                        { value: value, min: min, max: max }
                                    );
                                }
                            );

                            message = message.replace(
                                /The value (-?\d+) of "([^"]+)" is out of bounds\. min: (-?\d+) max: (-?\d+)\./g,
                                function (match, value, scaleType, min, max) {
                                    return gettextCatalog.getString(
                                        gettext('The value {{value}} of "{{scaleType}}" is out of bounds. min: {{min}} max: {{max}}.'),
                                        { value: value, scaleType: translateScaleType(scaleType), min: min, max: max }
                                    );
                                }
                            );

                            message = message.replace(
                                /The value for reduction amount \((-?\d+)\) is not valid \(min (-?\d+)\)\./g,
                                function (match, value, min) {
                                    return gettextCatalog.getString(
                                        gettext('The value for reduction amount ({{value}}) is not valid (min {{min}}).'),
                                        { value: value, min: min }
                                    );
                                }
                            );

                            message = message.replace(
                                /The scale index "(-?\d+)" is out of bounds\./g,
                                function (match, index) {
                                    return gettextCatalog.getString(
                                        gettext('The scale index "{{index}}" is out of bounds.'),
                                        { index: index }
                                    );
                                }
                            );

                            message = message.replace(
                                /An error occurred during the file upload\. Error code: (\d+)/g,
                                function (match, code) {
                                    return gettextCatalog.getString(
                                        gettext('An error occurred during the file upload. Error code: {{code}}'),
                                        { code: code }
                                    );
                                }
                            );

                            message = message.replace(
                                /The files upload directory "([^"]+)" is doesn't exist or or not writable/g,
                                function (match, directory) {
                                    return gettextCatalog.getString(
                                        gettext('The files upload directory "{{directory}}" is doesn\'t exist or or not writable'),
                                        { directory: directory }
                                    );
                                }
                            );

                            message = message.replace(
                                /Param "([^"]+)" is not allowed to have value "([^"]+)"\./g,
                                function (match, field, value) {
                                    return gettextCatalog.getString(
                                        gettext('Param "{{field}}" is not allowed to have value "{{value}}".'),
                                        { field: field, value: value }
                                    );
                                }
                            );

                            message = message.replace(
                                /The object is not linked to the anr ID "(\d+)"/g,
                                function (match, anrId) {
                                    return gettextCatalog.getString(
                                        gettext('The object is not linked to the anr ID "{{anrId}}"'),
                                        { anrId: anrId }
                                    );
                                }
                            );

                            message = message.replace(
                                /The current analysis language "([^"]+)" should be the same as importing one "([^"]+)"/g,
                                function (match, currentLanguage, importingLanguage) {
                                    return gettextCatalog.getString(
                                        gettext('The current analysis language "{{currentLanguage}}" should be the same as importing one "{{importingLanguage}}"'),
                                        { currentLanguage: currentLanguage, importingLanguage: importingLanguage }
                                    );
                                }
                            );

                            message = message.replace(
                                /Password validation errors: \[ (.+) \]\./g,
                                function (match, errors) {
                                    return gettextCatalog.getString(
                                        gettext('Password validation errors: [ {{errors}} ].'),
                                        { errors: errors }
                                    );
                                }
                            );

                            message = message.replace(
                                /Scale of type "([^"]+)" does not exist with anr ID: "([^"]+)"/g,
                                function (match, type, anrId) {
                                    return gettextCatalog.getString(
                                        gettext('Scale of type "{{type}}" does not exist with anr ID: "{{anrId}}"'),
                                        { type: type, anrId: anrId }
                                    );
                                }
                            );

                            message = message.replace(
                                /User with email "([^"]+)" does not exist/g,
                                function (match, email) {
                                    return gettextCatalog.getString(
                                        gettext('User with email "{{email}}" does not exist'),
                                        { email: email }
                                    );
                                }
                            );

                            message = message.replace(
                                /Entity of type "([^"]+)", with ID ([^ ]+) was not found in analysis ID (\d+)/g,
                                function (match, entityType, id, anrId) {
                                    return gettextCatalog.getString(
                                        gettext('Entity of type "{{entityType}}", with ID {{id}} was not found in analysis ID {{anrId}}'),
                                        { entityType: entityType, id: id, anrId: anrId }
                                    );
                                }
                            );

                            message = message.replace(
                                /Directory "([^"]+)" was not created/g,
                                function (match, directory) {
                                    return gettextCatalog.getString(
                                        gettext('Directory "{{directory}}" was not created'),
                                        { directory: directory }
                                    );
                                }
                            );

                            message = message.replace(
                                /The declared class "([^"]+)" can't be created/g,
                                function (match, className) {
                                    return gettextCatalog.getString(
                                        gettext("The declared class \"{{className}}\" can't be created"),
                                        { className: className }
                                    );
                                }
                            );

                            message = message.replace(
                                /The declared service class "([^"]+)" can't be created/g,
                                function (match, className) {
                                    return gettextCatalog.getString(
                                        gettext("The declared service class \"{{className}}\" can't be created"),
                                        { className: className }
                                    );
                                }
                            );

                            message = message.replace(
                                /Table's entity class name "([^"]+)" and entity class name "([^"]+)" should be equal\./g,
                                function (match, tableClassName, entityClassName) {
                                    return gettextCatalog.getString(
                                        gettext("Table's entity class name \"{{tableClassName}}\" and entity class name \"{{entityClassName}}\" should be equal."),
                                        { tableClassName: tableClassName, entityClassName: entityClassName }
                                    );
                                }
                            );

                            return gettextCatalog.getString(message);
                        }

                        if (response.status === 400) {
                            for (i = 0; i < response.data.errors.length; ++i) {
                                const messages = response.data.errors[i];
                                let validationErrors = '';
                                if (messages.hasOwnProperty('row')) {
                                    validationErrors += gettextCatalog.getString(gettext('Validation errors in row')) + ' #'
                                      + messages.row + "\r\n";
                                } else {
                                    validationErrors += gettextCatalog.getString(gettext('Input data validation errors:')) + "\r\n";
                                }
                                if (messages.hasOwnProperty('validationErrors')) {
                                    for (const [field, fieldMessage] of Object.entries(messages.validationErrors)) {
                                        validationErrors += '[' + gettextCatalog.getString(field) + "] :\r\n";
                                        for (const message of fieldMessage) {
                                            validationErrors += '- ' + translateKnownErrorMessage(message) + "\r\n";
                                        }
                                    }
                                }
                                ErrorService.notifyError(validationErrors);
                            }
                        } else if (response.status === 401) {
                            const state = $injector.get('$state');
                            if (state.current.name !== 'passwordforgotten' && state.current.name !== '') {
                                state.transitionTo('login');
                            }
                        } else if (response.status === 403) {
                            const resourceUrl = response.config.url;
                            if (resourceUrl) {
                                ErrorService.notifyError(gettextCatalog.getString(
                                    gettext('This resource is forbidden: {{resourceUrl}}'),
                                    { resourceUrl: resourceUrl }
                                ));
                            } else {
                                ErrorService.notifyError(gettextCatalog.getString(gettext('Unauthorized operation occurred.')));
                            }
                        } else if (response.status === 412) {
                            // Human-readable error, with translation support
                            for (i = 0; i < response.data.errors.length; ++i) {
                                ErrorService.notifyError(translateKnownErrorMessage(response.data.errors[i].message));
                            }
                        } else if (response.status >= 400 && response.config.url.indexOf('auth') < 0) {
                            var message = response.status;
                            var url = response.config.url;

                            // Either get our own custom error message, or Zend default error message
                            if (response.data && response.data.message) {
                                message = response.data.message;
                            } else if (response.data && response.data.errors && response.data.errors.length > 0) {
                                message = response.data.errors[0].message;
                            }

                            if (url.indexOf('?') > 0) {
                                url = url.substring(0, url.indexOf('?'));
                            }

                            ErrorService.notifyFetchError(url, translateKnownErrorMessage(message) + " (" + response.status + ")");
                        }

                        var $q = $injector.get('$q');
                        return $q.reject(response);
                    }
                }
            }]);
            $httpProvider.interceptors.push('monarcHttpInter');
        }]).
    run(['ConfigService', 'UserService', 'gettextCatalog', '$rootScope',
        function (ConfigService, UserService, gettextCatalog, $rootScope) {
            $rootScope.OFFICE_MODE = 'BO';

            ConfigService.loadConfig(function () {
                $rootScope.languages = ConfigService.getLanguages();
                var uiLang = UserService.getUiLanguage();
                $rootScope.mospApiUrl = ConfigService.getMospApiUrl();
                $rootScope.appVersion = ConfigService.getVersion();
                $rootScope.currentYear = new Date().getFullYear();

                if (uiLang === undefined || uiLang === null || !$rootScope.languages[uiLang]) {
                    uiLang = ConfigService.getDefaultLanguageIndex();
                }
                gettextCatalog.setCurrentLanguage($rootScope.languages[uiLang].code);
                $rootScope.uiLanguage = $rootScope.languages[uiLang].flag;

                $rootScope.updatePaginationLabels();
            });

            $rootScope._langField = function (obj, field) {
                if (!obj) {
                    return '';
                } else {
                    var uiLang = UserService.getUiLanguage();
                    if (!field) {
                        return obj + (uiLang ? uiLang : ConfigService.getDefaultLanguageIndex());
                    } else {
                        if (!obj[field + uiLang] || obj[field + uiLang] === '') {
                            return obj[field + ConfigService.getDefaultLanguageIndex()];
                        } else {
                            return obj[field + uiLang];
                        }
                    }
                }
            };

            $rootScope.range = function (x,y) {
                var out = [];
                for (var i = x; i <= y; ++i) {
                    out.push(i);
                }
                return out;
            };

            $rootScope.getUrlAnrId = function () {
                // Stub, used only in FO
                return undefined;
            };

            // Setup dialog-specific scope based on the rootScope. This is mostly used to have access to _langField
            // in dialog views as well without having to manually declare it every time. We clone the scope so that
            // dialog have their distinct scope and avoid editing the parent one.
            $rootScope.$dialogScope = $rootScope.$new();

            // Method to update pagination labels globally when switching language in account settings
            $rootScope.updatePaginationLabels = function () {
                $rootScope.paginationLabels = {
                    page: gettextCatalog.getString('Page:'),
                    rowsPerPage: gettextCatalog.getString('Rows per page:'),
                    of: gettextCatalog.getString('of')
                }
            }

            $rootScope.updatePaginationLabels();

            //Handle rejection when close/ESC a $mdDialog
            $rootScope.handleRejectionDialog = function(reject) {
              if(reject !== undefined) throw reject;
            }

            //Get language code by index
            $rootScope.getLanguageCode = function(index) {
              return $rootScope.languages[index].code;
            }
        }
    ]);
