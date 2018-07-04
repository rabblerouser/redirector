variable "domain" {
  description = "The domain where Rabble Rouser is deployed."
}
variable "region" {
  default = "ap-southeast-2"
}

variable "redirector_lambda_name" {
  default = "RedirectorV4"
}

variable "access_key" {}
variable "secret_key" {}
