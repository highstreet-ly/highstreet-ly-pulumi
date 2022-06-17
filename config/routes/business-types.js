let serviceAddress = "sonatribe-ticketmanagement-api" //'192.168.1.130' //  "sonatribe-ticketmanagement-api" //

let servicePort = 80 // 8087 //   80 //

function businessTypesRead() {
    return [
        {
            "DownstreamPathTemplate": "/api/v1/business-types",
            "UpstreamPathTemplate": "/api/v1/business-types",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": serviceAddress,
                    "Port": servicePort,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        },
        {
            "DownstreamPathTemplate": "/api/v1/business-types/{everything}",
            "UpstreamPathTemplate": "/api/v1/business-types/{everything}",
            "UpstreamHttpMethod": [
                "Get"
            ],
            "DownstreamScheme": "http",
            "DownstreamHostAndPorts": [
                {
                    "Host": serviceAddress,
                    "Port": servicePort,
                }
            ],
            "LoadBalancerOptions": {
                "Type": "LeastConnection"
            }
        }]
}

function businessTypesWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/business-types/{everything}",
        "UpstreamPathTemplate": "/api/v1/business-types/{everything}",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/business-types",
        "UpstreamPathTemplate": "/api/v1/business-types",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    },]
}

module.exports = {
    businessTypesRead,
    businessTypesWrite
}
