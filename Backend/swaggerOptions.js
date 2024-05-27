module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Croplite API',
      version: '1.0.0',
      description: 'API documentation for Croplite application',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        Blog: {
          type: 'object',
          required: ['title', 'content', 'author'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the blog post',
            },
            title: {
              type: 'string',
              description: 'The title of the blog post',
            },
            content: {
              type: 'string',
              description: 'The content of the blog post',
            },
            author: {
              type: 'string',
              description: 'The author of the blog post',
            },
            image: {
              type: 'string',
              description: 'The image URL of the blog post',
            },
            likes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  user: {
                    type: 'string',
                  },
                },
              },
            },
            comments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  content: {
                    type: 'string',
                  },
                  author: {
                    type: 'string',
                  },
                  date: {
                    type: 'string',
                    format: 'date-time',
                  },
                },
              },
            },
          },
        },
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'The username of the user',
            },
            email: {
              type: 'string',
              description: 'The email of the user',
            },
            password: {
              type: 'string',
              description: 'The password of the user',
            },
          },
        },
        ContactUs: {
          type: 'object',
          required: ['name', 'email', 'message'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the person contacting',
            },
            email: {
              type: 'string',
              description: 'The email of the person contacting',
            },
            message: {
              type: 'string',
              description: 'The message from the person contacting',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the product',
            },
            name: {
              type: 'string',
              description: 'The name of the product',
            },
            price: {
              type: 'number',
              description: 'The price of the product',
            },
            description: {
              type: 'string',
              description: 'The description of the product',
            },
          },
        },
      },
    },
    paths: {
      '/api/posts': {
        get: {
          summary: 'Retrieves a list of blog posts',
          responses: {
            200: {
              description: 'A list of blog posts',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Blog',
                    },
                  },
                },
              },
            },
            500: {
              description: 'Server error',
            },
          },
        },
        post: {
          summary: 'Create a new blog post',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                    author: { type: 'string' },
                    image: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Blog post created successfully',
            },
            400: {
              description: 'Bad request',
            },
          },
        },
      },
      '/api/register': {
        post: {
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User registered successfully',
            },
            409: {
              description: 'Username or Email is already registered',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/api/login': {
        post: {
          summary: 'Login a user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'User logged in successfully',
            },
            401: {
              description: 'Invalid email or password',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/api/getkey': {
        get: {
          summary: 'Retrieve the Razorpay key',
          responses: {
            200: {
              description: 'Successfully retrieved the Razorpay key',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      key: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/checkout': {
        post: {
          summary: 'Create a new Razorpay order',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    amount: { type: 'number' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Successfully created a new order',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      order: { type: 'object' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/paymentverification': {
        post: {
          summary: 'Verify a Razorpay payment',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    razorpay_order_id: { type: 'string' },
                    razorpay_payment_id: { type: 'string' },
                    razorpay_signature: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Successfully verified the payment',
            },
          },
        },
      },
      '/api/posts/{postId}/like': {
        post: {
          summary: 'Like a blog post',
          parameters: [
            {
              in: 'path',
              name: 'postId',
              required: true,
              schema: { type: 'string' },
              description: 'The ID of the blog post to like',
            },
          ],
          responses: {
            200: {
              description: 'Blog post liked successfully',
            },
            404: {
              description: 'Blog post not found',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/api/posts/{postId}/dislike': {
        post: {
          summary: 'Dislike a blog post',
          parameters: [
            {
              in: 'path',
              name: 'postId',
              required: true,
              schema: { type: 'string' },
              description: 'The ID of the blog post to dislike',
            },
          ],
          responses: {
            200: {
              description: 'Blog post disliked successfully',
            },
            404: {
              description: 'Blog post not found',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/api/posts/{postId}/comments': {
        post: {
          summary: 'Add a comment to a blog post',
          parameters: [
            {
              in: 'path',
              name: 'postId',
              required: true,
              schema: { type: 'string' },
              description: 'The ID of the blog post to comment on',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    content: { type: 'string' },
                    author: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Comment added successfully',
            },
            404: {
              description: 'Blog post not found',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/api/posts/{postId}/comments/{commentId}': {
        delete: {
          summary: 'Delete a comment from a blog post',
          parameters: [
            {
              in: 'path',
              name: 'postId',
              required: true,
              schema: { type: 'string' },
              description: 'The ID of the blog post',
            },
            {
              in: 'path',
              name: 'commentId',
              required: true,
              schema: { type: 'string' },
              description: 'The ID of the comment to delete',
            },
          ],
          responses: {
            200: {
              description: 'Comment deleted successfully',
            },
            404: {
              description: 'Blog post or comment not found',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/submit': {
        post: {
          summary: 'Submit contact us form',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Data saved successfully',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/products': {
        get: {
          summary: 'Get a list of products',
          responses: {
            200: {
              description: 'A list of products',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product',
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
    },
  };
  