import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic<{
  spec: any;
  // @ts-ignore
  //Ignore this type problem because of library failure
}>(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Elections api",
        version: "1.0",
        description:
          "This API provides information about elections. Please note that the data is sourced from https://ekloges.ypes.gr, and I don't own any of the data.",
      },

      paths: {
        "/api/city": {
          post: {
            summary: "Get info about cities",
            requestBody: {
              description: "Accepted values stats or full on type and city id",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        enum: ["stats", "full"],
                      },
                      id: {
                        type: "number",
                      },
                    },
                    required: ["type", "id"],
                  },
                },
              },
            },
            responses: {
              "400": {
                description:
                  "Missing ID parameter,Missing Request Type,Invalid ID parameter",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
        "/api/country": {
          post: {
            summary: "Get info about countries",
            requestBody: {
              description: "Accepted values stats or full and country id",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        enum: ["stats", "full"],
                      },
                      id: {
                        type: "number",
                      },
                    },
                    required: ["type", "id"],
                  },
                },
              },
            },
            responses: {
              "400": {
                description:
                  "Missing ID parameter,Missing Request Type,Invalid ID parameter",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
        "/api/party": {
          post: {
            summary: "Get info about specific party",
            description: "Give party id",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                    },
                    required: ["id"],
                  },
                },
              },
            },
            responses: {
              "400": {
                description: "Missing ID parameter,Invalid ID parameter",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
        "/api/overseas": {
          post: {
            summary: "Get info about overseas data",
            requestBody: {
              description: "Accepted values stats or full",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        enum: ["stats", "full"],
                      },
                    },
                    required: ["type"],
                  },
                },
              },
            },
            responses: {
              "400": {
                description: "Invalid Request Type,Missing Request Type",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
        "/api/epikrateia": {
          post: {
            summary: "Get info about epikrateia (General Greece)",
            requestBody: {
              description: "Accepted values stats or full",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        enum: ["stats", "full"],
                      },
                    },
                    required: ["type"],
                  },
                },
              },
            },
            responses: {
              "400": {
                description: "Invalid Request Type,Missing Request Type",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
        "/api/cpp": {
          post: {
            summary: "Get info about candidates per region",
            requestBody: {
              description: "Give region id",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                      },
                    },
                    required: ["id"],
                  },
                },
              },
            },
            responses: {
              "400": {
                description: "Missing ID parameter,Invalid ID parameter",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
        "/api/deputies": {
          get: {
            summary:
              "Get info about 300 deputies that take a seat in parliament",
            responses: {
              "400": {
                description: "Missing ID parameter,Invalid ID parameter",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
        "/api/ep": {
          post: {
            summary: "Get info about countries",
            requestBody: {
              description: "Accepted values stats or full",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        enum: ["stats", "full"],
                      },
                      id: {
                        type: "number",
                      },
                    },
                    required: ["type", "id"],
                  },
                },
              },
            },
            responses: {
              "400": {
                description:
                  "Missing ID parameter,Missing Request Type,Invalid ID parameter,Invalid Request Type",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
        "/api/ep-votes": {
          post: {
            summary: "Get party votes per region",
            requestBody: {
              description:
                "Give ep id to get party votes. If you want give the party id as string to get for specific party",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      party: {
                        type: "string",
                      },
                      id: {
                        type: "number",
                      },
                    },
                    required: ["party", "id"],
                  },
                },
              },
            },
            responses: {
              "400": {
                description: "Missing ID parameter,Invalid ID parameter",
              },
              "404": {
                description: "Not found",
              },
              "500": {
                description: "Internal server error",
              },
              "200": {
                description: "Success data",
              },
            },
          },
        },
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
