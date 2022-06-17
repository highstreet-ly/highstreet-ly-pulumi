let serviceAddress = "sonatribe-permissions-api" // '192.168.1.130' //  

let servicePort =  80 //   8086 //


function usersRead() {
    return [{
        "DownstreamPathTemplate": "/api/v1/users",
        "UpstreamPathTemplate": "/api/v1/users",
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
    }, {
        "DownstreamPathTemplate": "/api/v1/users/{everything}",
        "UpstreamPathTemplate": "/api/v1/users/{everything}",
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
        "DownstreamPathTemplate": "/connect/userinfo",
        "UpstreamPathTemplate": "/connect/userinfo",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonaticket-ids",
                "Port": 80
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    },
    {
        "DownstreamPathTemplate": "/connect/token",
        "UpstreamPathTemplate": "/connect/token",
        "UpstreamHttpMethod": [
            "Get"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonaticket-ids",
                "Port": 80
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }]
}

function usersWrite() {
    return [{
        "DownstreamPathTemplate": "/api/v1/users/{everything}",
        "UpstreamPathTemplate": "/api/v1/users/{everything}",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http", "DownstreamHostAndPorts": [
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
        "DownstreamPathTemplate": "/api/v1/users",
        "UpstreamPathTemplate": "/api/v1/users",
        "UpstreamHttpMethod": [
            "Put",
            "Delete",
            "Post",
            "Patch"
        ],
        "DownstreamScheme": "http", "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/users/resendconfirmemail",
        "UpstreamPathTemplate": "/api/v1/users/resendconfirmemail",
        "UpstreamHttpMethod": [
            "Post"
        ],
        "DownstreamScheme": "http", "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/register",
        "UpstreamPathTemplate": "/api/v1/register",
        "UpstreamHttpMethod": [
            "Get",
            "Post"
        ],
        "DownstreamScheme": "http", "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/forgot-password",
        "UpstreamPathTemplate": "/api/v1/forgot-password",
        "UpstreamHttpMethod": [
            "Post"
        ],
        "DownstreamScheme": "http", "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/reset-password",
        "UpstreamPathTemplate": "/api/v1/reset-password",
        "UpstreamHttpMethod": [
            "Post"
        ],
        "DownstreamScheme": "http", "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/api/v1/confirm-email",
        "UpstreamPathTemplate": "/api/v1/confirm-email",
        "UpstreamHttpMethod": [
            "Post"
        ],
        "DownstreamScheme": "http", "DownstreamHostAndPorts": [
            {
                "Host": serviceAddress,
                "Port": servicePort,
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }, {
        "DownstreamPathTemplate": "/connect/token",
        "UpstreamPathTemplate": "/connect/token",
        "UpstreamHttpMethod": [
            "Post"
        ],
        "DownstreamScheme": "http",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonaticket-ids",
                "Port": 80
            }
        ],
        "LoadBalancerOptions": {
            "Type": "LeastConnection"
        }
    }]
}

module.exports = {
    usersRead,
    usersWrite
}
