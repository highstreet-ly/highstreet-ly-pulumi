let serviceAddress = "sonatribe-ticketreservations-api" //'192.168.1.130' //  

let servicePort =  80 //8087 //  

function pricedOrdersRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/priced-orders",
        "UpstreamPathTemplate": "/api/v1/priced-orders",
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
        "DownstreamPathTemplate": "/api/v1/priced-orders/{everything}",
        "UpstreamPathTemplate": "/api/v1/priced-orders/{everything}",
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

function pricedOrdersWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/priced-orders/{everything}",
        "UpstreamPathTemplate": "/api/v1/priced-orders/{everything}",
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
    },
    {
        "DownstreamPathTemplate": "/api/v1/priced-orders",
        "UpstreamPathTemplate": "/api/v1/priced-orders",
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
    }]
}
module.exports = {
    pricedOrdersRead,
    pricedOrdersWrite
}