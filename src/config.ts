export default {
  /**
   * This value is arbitrary and used when making GQL queries to AppSync.
   * It is used to fetch "all" records in cases where pagination is unnecessary.
   */
  arbitraryQueryLimit: 1000,
  app: {
    name: "Benn's Ethicoa",
    companyName: "Benn's Ethicoa Pte Ltd",
    absoluteUrl: 'https://www.bennsethicoa.com',
  },
  adminAbsoluteUrl: 'https://admin.bennsethicoa.com',
  meta: {
    title: "Benn's Ethicoa",
  },
  locale: 'en-SG',
  aws: {
    aws_project_region: process.env.aws_project_region,
    aws_appsync_graphqlEndpoint: process.env.aws_appsync_graphqlEndpoint,
    aws_appsync_region: process.env.aws_appsync_region,
    aws_appsync_authenticationType: process.env.aws_appsync_authenticationType,
    aws_appsync_apiKey: process.env.aws_appsync_apiKey,
    aws_cloud_logic_custom: [
      {
        name: 'stripe',
        endpoint: process.env.aws_cloud_logic_custom_stripe_endpoint,
        region: 'ap-southeast-1',
      },
      {
        name: 'mailgen',
        endpoint: process.env.aws_cloud_logic_custom_mailgen_endpoint,
        region: 'ap-southeast-1',
      },
    ],
    aws_cognito_identity_pool_id: process.env.aws_cognito_identity_pool_id,
    aws_cognito_region: process.env.aws_cognito_region,
    aws_user_pools_id: process.env.aws_user_pools_id,
    aws_user_pools_web_client_id: process.env.aws_user_pools_web_client_id,
    oauth: {},
    aws_user_files_s3_bucket: process.env.aws_user_files_s3_bucket,
    aws_user_files_s3_bucket_region: process.env.aws_user_files_s3_bucket_region,
    aws_mobile_analytics_app_id: process.env.aws_mobile_analytics_app_id,
    aws_mobile_analytics_app_region: process.env.aws_mobile_analytics_app_region,
  },
  eventKey: 'FACTORY_TOUR',
  mail: {
    aws_pinpoint_access_key_id: process.env.aws_pinpoint_access_key_id,
    aws_pinpoint_secret_access_key: process.env.aws_pinpoint_secret_access_key,
    defaultFrom: 'Dev 1XT <dev@onextech.com>',
  },
  stripe: {
    publicKey: process.env.stripe_public_key,
  },
  analytics: {
    ga: {
      trackingId: '',
    },
  },
  seo: {
    title: "Benn's Ethicoa",
    description: '',
    image: '',
    url: 'https://bennsethicoa.com',
  },
  socialProfileLinks: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
  shippingFee: {
    value: 5,
    threshold: 25,
  },
}
