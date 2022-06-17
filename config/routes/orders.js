function ordersRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/orders",
        "UpstreamPathTemplate": "/api/v1/orders",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/orders/{everything}",
        "UpstreamPathTemplate": "/api/v1/orders/{everything}",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/order-tickets",
        "UpstreamPathTemplate": "/api/v1/order-tickets",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/order-tickets/{everything}",
        "UpstreamPathTemplate": "/api/v1/order-tickets/{everything}",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/ticket-details",
        "UpstreamPathTemplate": "/api/v1/ticket-details",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/ticket-details/{everything}",
        "UpstreamPathTemplate": "/api/v1/ticket-details/{everything}",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/product-extra-groups",
        "UpstreamPathTemplate": "/api/v1/product-extra-groups",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/product-extra-groups/{everything}",
        "UpstreamPathTemplate": "/api/v1/product-extra-groups/{everything}",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/product-extras",
        "UpstreamPathTemplate": "/api/v1/product-extras",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/product-extras/{everything}",
        "UpstreamPathTemplate": "/api/v1/product-extras/{everything}",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/orders-by-day",
        "UpstreamPathTemplate": "/api/v1/orders-by-day",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/orders-by-day/{everything}",
        "UpstreamPathTemplate": "/api/v1/orders-by-day/{everything}",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/refunds-by-day",
        "UpstreamPathTemplate": "/api/v1/refunds-by-day",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/refunds-by-day/{everything}",
        "UpstreamPathTemplate": "/api/v1/refunds-by-day/{everything}",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/registered-interest-by-day",
        "UpstreamPathTemplate": "/api/v1/registered-interest-by-day",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/registered-interest-by-day/{everything}",
        "UpstreamPathTemplate": "/api/v1/registered-interest-by-day/{everything}",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/tickets-sold-by-day",
        "UpstreamPathTemplate": "/api/v1/tickets-sold-by-day",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/tickets-sold-by-day/{everything}",
        "UpstreamPathTemplate": "/api/v1/tickets-sold-by-day/{everything}",
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

function ordersWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/orders/{everything}",
        "UpstreamPathTemplate": "/api/v1/orders/{everything}",

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
        "DownstreamPathTemplate": "/api/v1/orders",
        "UpstreamPathTemplate": "/api/v1/orders",
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
        "DownstreamPathTemplate": "/api/v1/product-extra-groups/{everything}",
        "UpstreamPathTemplate": "/api/v1/product-extra-groups/{everything}",

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
        "DownstreamPathTemplate": "/api/v1/product-extra-groups",
        "UpstreamPathTemplate": "/api/v1/product-extra-groups",
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
        "DownstreamPathTemplate": "/api/v1/product-extras/{everything}",
        "UpstreamPathTemplate": "/api/v1/product-extras/{everything}",

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
        "DownstreamPathTemplate": "/api/v1/product-extras",
        "UpstreamPathTemplate": "/api/v1/product-extras",
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
    ordersRead,
    ordersWrite
}