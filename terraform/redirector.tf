data "aws_s3_bucket_object" "redirector_zip" {
  bucket = "${var.domain}-redirector-bucket"
  key = "redirector.zip"
}

resource "aws_lambda_function" "redirector" {
  s3_bucket     = "${data.aws_s3_bucket_object.redirector_zip.bucket}"
  s3_key        = "${data.aws_s3_bucket_object.redirector_zip.key}"
  s3_object_version = "${data.aws_s3_bucket_object.redirector_zip.version_id}"
  function_name = "${var.redirector_lambda_name}"
  handler       = "index.handler"
  timeout       = 10
  role          = "${aws_iam_role.redirector_role.arn}"
  runtime       = "nodejs6.10"
}

resource "aws_iam_role_policy_attachment" "redirector_policy" {
  role       = "${aws_iam_role.redirector_role.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaKinesisExecutionRole"
}

resource "aws_iam_role" "redirector_role" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow"
      }
    ]
}
EOF
}
