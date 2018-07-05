resource "aws_api_gateway_rest_api" "redirector_api" {
  name        = "${var.redirector_lambda_name}"
  description = "API Gateway for the redirector lambda function."
}

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = "${aws_api_gateway_rest_api.redirector_api.id}"
  resource_id   = "${aws_api_gateway_rest_api.redirector_api.root_resource_id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = "${aws_api_gateway_rest_api.redirector_api.id}"
  resource_id = "${aws_api_gateway_method.proxy_root.resource_id}"
  http_method = "${aws_api_gateway_method.proxy_root.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.redirector.invoke_arn}"
}

resource "aws_api_gateway_deployment" "redirector_deployment" {
  depends_on = [
    "aws_api_gateway_integration.lambda_root",
  ]
  rest_api_id = "${aws_api_gateway_rest_api.redirector_api.id}"
  stage_name  = "${var.api_gateway_stage_name}"
}

resource "aws_lambda_permission" "lambda_api" {
  depends_on = [
    "aws_lambda_function.redirector",
    "aws_api_gateway_rest_api.redirector_api",
    "aws_api_gateway_method.proxy_root"
  ]
  statement_id = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.redirector.function_name}"
  principal = "apigateway.amazonaws.com"
}

resource "aws_lambda_permission" "lambda_api_method" {
  depends_on = [
    "aws_lambda_function.redirector",
    "aws_api_gateway_rest_api.redirector_api",
    "aws_api_gateway_method.proxy_root"
  ]
  statement_id = "AllowExecutionFromAPIGatewayMethod"
  action = "lambda:*"
  function_name = "${aws_lambda_function.redirector.function_name}"
  principal = "apigateway.amazonaws.com"
  source_arn = "arn:aws:execute-api:${var.region}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.redirector_api.id}/*/*"
}
