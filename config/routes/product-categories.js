
function productCategoryWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/product-categories",
        "UpstreamPathTemplate": "/api/v1/product-categories",
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
    },
    {
        "DownstreamPathTemplate": "/api/v1/product-categories/{everything}",
        "UpstreamPathTemplate": "/api/v1/product-categories/{everything}",
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
    }]
}

function productCategoryRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/product-categories",
        "UpstreamPathTemplate": "/api/v1/product-categories",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "QoSOptions": {
            "ExceptionsAllowedBeforeBreaking": 3,
            "DurationOfBreak": 10,
            "TimeoutValue": 5000
        },
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-ticketmanagement-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        },

    },
    {
        "DownstreamPathTemplate": "/api/v1/product-categories/{everything}",
        "UpstreamPathTemplate": "/api/v1/product-categories/{everything}",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "QoSOptions": {
            "ExceptionsAllowedBeforeBreaking": 3,
            "DurationOfBreak": 10,
            "TimeoutValue": 5000
        },
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-ticketmanagement-api",
                "Port": 80,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        },

    }];
}

module.exports = {
    productCategoryRead,
    productCategoryWrite,
}