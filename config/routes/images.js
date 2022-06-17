
function imagesGet() {
    return [{
        "DownstreamPathTemplate": "/api/v1/images/{everything}",
        "UpstreamPathTemplate": "/api/v1/images/{everything}",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "DownstreamScheme": "http",
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
        "DownstreamPathTemplate": "/api/v1/images",
        "UpstreamPathTemplate": "/api/v1/images",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "DownstreamScheme": "http",
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

function imagesPost() {
    return [{
        "DownstreamPathTemplate": "/api/v1/images/{everything}",
        "UpstreamPathTemplate": "/api/v1/images/{everything}",

        "UpstreamHttpMethod": [
            "Post", "Patch", "Delete"
        ],
        "DownstreamScheme": "http",
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
        "DownstreamPathTemplate": "/api/v1/images",
        "UpstreamPathTemplate": "/api/v1/images",
        "UpstreamHttpMethod": [
            "Post", "Patch", "Delete"
        ],

        "DownstreamScheme": "http",
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

module.exports = {
    imagesPost,
    imagesGet
}
