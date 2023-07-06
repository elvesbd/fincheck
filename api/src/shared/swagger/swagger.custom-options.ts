import { SwaggerCustomOptions } from '@nestjs/swagger';

export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Api Fincheck',
  customfavIcon: 'https://filtrocredenciado.cartaovaibem.com.br/favicon.ico',
  customCss:
    'img[alt="Swagger UI"] { display: block;-moz-box-sizing: border-box; box-sizing: border-box; content: url("https://filtrocredenciado.cartaovaibem.com.br/static/media/logo.df6ddaba.png"); max-width: 100%; max-height: 100%; }.swagger-ui .topbar { background-color: #691DBC; padding: 10px 0;} .swagger-ui .info>div { margin: 0 0 5px; color: #691DBC; } .swagger-ui .info .title { color: #14F484; font-family: "Montserrat",sans-serif; font-size: 36px; margin: 0; color: #691DBC; backgroud-color: #fff} .swagger-ui .wrapper { box-sizing: border-box;margin: 0 auto;max-width: 1460px;padding: 0 20px; width: 100%; backgroud-color: #fff;} .swagger-ui .btn.authorize { background-color: #14F484; border-color: #691DBC; color: #691DBC; display: inline; line-height: 1; } .swagger-ui .btn.authorize svg { fill: #691DBC; }',
};
