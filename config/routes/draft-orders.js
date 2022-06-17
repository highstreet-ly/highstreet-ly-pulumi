let serviceAddress = "sonatribe-ticketreservations-api" //  '192.168.1.130'//

let servicePort =  80 //8087 // 

function draftOrdersRead() {
  return [{
    "DownstreamPathTemplate": "/api/v1/draft-orders",
    "UpstreamPathTemplate": "/api/v1/draft-orders",
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
    "DownstreamPathTemplate": "/api/v1/draft-orders/{everything}",
    "UpstreamPathTemplate": "/api/v1/draft-orders/{everything}",
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
    "DownstreamPathTemplate": "/api/v1/draft-order-items",
    "UpstreamPathTemplate": "/api/v1/draft-order-items",
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
    "DownstreamPathTemplate": "/api/v1/draft-order-items/{everything}",
    "UpstreamPathTemplate": "/api/v1/draft-order-items/{everything}",
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
    "DownstreamPathTemplate": "/api/v1/product-extras",
    "UpstreamPathTemplate": "/api/v1/r/product-extras",
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
    "DownstreamPathTemplate": "/api/v1/product-extras/{everything}",
    "UpstreamPathTemplate": "/api/v1/r/product-extras/{everything}",
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
    "DownstreamPathTemplate": "/api/v1/ticket-details",
    "UpstreamPathTemplate": "/api/v1/r/ticket-details",
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
    "DownstreamPathTemplate": "/api/v1/ticket-details/{everything}",
    "UpstreamPathTemplate": "/api/v1/r/ticket-details/{everything}",
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

function draftOrdersWrite() {
  return [{
    "DownstreamPathTemplate": "/api/v1/draft-orders/{everything}",
    "UpstreamPathTemplate": "/api/v1/draft-orders/{everything}",
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
    "DownstreamPathTemplate": "/api/v1/draft-orders",
    "UpstreamPathTemplate": "/api/v1/draft-orders",
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
    "DownstreamPathTemplate": "/api/v1/draft-order-items/{everything}",
    "UpstreamPathTemplate": "/api/v1/draft-order-items/{everything}",
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
    "DownstreamPathTemplate": "/api/v1/draft-order-items",
    "UpstreamPathTemplate": "/api/v1/draft-order-items",
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
    "DownstreamPathTemplate": "/api/v1/product-extras/{everything}",
    "UpstreamPathTemplate": "/api/v1/r/product-extras/{everything}",

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
    "DownstreamPathTemplate": "/api/v1/product-extras",
    "UpstreamPathTemplate": "/api/v1/r/product-extras",
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
    "DownstreamPathTemplate": "/api/v1/ticket-details/{everything}",
    "UpstreamPathTemplate": "/api/v1/r/ticket-details/{everything}",

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
    "DownstreamPathTemplate": "/api/v1/ticket-details",
    "UpstreamPathTemplate": "/api/v1/r/ticket-details",
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
  draftOrdersRead,
  draftOrdersWrite
}