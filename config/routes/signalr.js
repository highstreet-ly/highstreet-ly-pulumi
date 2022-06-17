function signalr() {
    return [{
        "DownstreamPathTemplate": "/{catchAll}",
        "DownstreamScheme": "wss",
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-signalr-api",
                "Port": 80
            }
        ],
        "UpstreamPathTemplate": "/gateway/{catchAll}",
        "UpstreamHttpMethod": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }, 
    {
        "DownstreamPathTemplate": "/connection/{everything}",
        "UpstreamPathTemplate": "/connection/{everything}",
        "UpstreamHttpMethod": [
            "Get",
            "Post"
        ],
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-signalr-api",
                "Port": 80
            }
        ],
    }, {
        "DownstreamPathTemplate": "/connection",
        "UpstreamPathTemplate": "/connection",
        "UpstreamHttpMethod": [
            "Get",
            "Post"
        ],
        "DownstreamHostAndPorts": [
            {
                "Host": "sonatribe-signalr-api",
                "Port": 80
            }
        ],
    }
]
}

module.exports = { signalr }