output "base_url" {
  value = "${aws_api_gateway_deployment.redirector_deployment.invoke_url}"
}
