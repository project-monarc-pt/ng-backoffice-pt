(function () {

    angular
        .module('BackofficeApp')
        .factory('ClientRecommendationService', [ '$resource', 'MassDeleteService', ClientRecommendationService ]);

    /**
     * Back office implementation of the recommendations API: the common (knowledge base) library,
     * so the endpoints are not scoped to an analysis, unlike the front office counterpart.
     * The name is kept because the shared ng-anr module injects this service by that name.
     */
    function ClientRecommendationService($resource, MassDeleteService) {
        var self = this;

        self.RecommendationResource = $resource('api/recommendations/:id', { id: '@uuid' },
            {
                'update': {
                    method: 'PUT'
                },
                'patch': {
                    method: 'PATCH'
                },
                'query': {
                    isArray: false
                }
            });

        self.RecommendationSetResource = $resource('api/recommendations-sets/:id', { id: '@uuid' },
            {
                'update': {
                    method: 'PUT'
                },
                'query': {
                    isArray: false
                }
            });

        var getRecommendations = function (params) {
            return self.RecommendationResource.query(params).$promise;
        };

        var getRecommendation = function (id) {
            return self.RecommendationResource.get({ id: id }).$promise;
        };

        var createRecommendation = function (params, success, error) {
            return new self.RecommendationResource(params).$save(success, error);
        };

        var updateRecommendation = function (params, success, error) {
            self.RecommendationResource.update({ id: params.uuid }, params, success, error);
        };

        var patchRecommendation = function (id, params, success, error) {
            self.RecommendationResource.patch({ id: id }, params, success, error);
        };

        var deleteRecommendation = function (params, success, error) {
            self.RecommendationResource.delete(params, success, error);
        };

        var deleteMassRecommendation = function (ids, success, error) {
            MassDeleteService.deleteMass('api/recommendations', ids, success, error);
        };

        var getRecommendationsSets = function (params) {
            return self.RecommendationSetResource.query(params).$promise;
        };

        var getRecommendationSet = function (id) {
            return self.RecommendationSetResource.get({ id: id }).$promise;
        };

        var createRecommendationSet = function (params, success, error) {
            return new self.RecommendationSetResource(params).$save(success, error);
        };

        var updateRecommendationSet = function (params, success, error) {
            self.RecommendationSetResource.update({ id: params.uuid }, params, success, error);
        };

        var deleteRecommendationSet = function (params, success, error) {
            self.RecommendationSetResource.delete(params, success, error);
        };

        return {
            getRecommendations: getRecommendations,
            getRecommendation: getRecommendation,
            createRecommendation: createRecommendation,
            updateRecommendation: updateRecommendation,
            patchRecommendation: patchRecommendation,
            deleteRecommendation: deleteRecommendation,
            deleteMassRecommendation: deleteMassRecommendation,
            getRecommendationsSets: getRecommendationsSets,
            getRecommendationSet: getRecommendationSet,
            createRecommendationSet: createRecommendationSet,
            updateRecommendationSet: updateRecommendationSet,
            deleteRecommendationSet: deleteRecommendationSet
        };
    }
})
();
