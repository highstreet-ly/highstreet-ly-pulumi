function businessTypeFeatureTemplatesRead() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/business-type-feature-templates",
            "UpstreamPathTemplate": "/api/v1/business-type-feature-templates",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-ticketmanagement-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/api/v1/business-type-feature-templates/{everything}",
            "UpstreamPathTemplate": "/api/v1/business-type-feature-templates/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": "sonatribe-ticketmanagement-api",
                    "Port": 80,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}

function businessTypeFeatureTemplatesWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/business-type-feature-templates/{everything}",
        "UpstreamPathTemplate": "/api/v1/business-type-feature-templates/{everything}",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-ticketmanagement-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/business-type-feature-templates",
        "UpstreamPathTemplate": "/api/v1/business-type-feature-templates",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-ticketmanagement-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    },]
}

module.exports = {
    businessTypeFeatureTemplatesRead,
    businessTypeFeatureTemplatesWrite
}
