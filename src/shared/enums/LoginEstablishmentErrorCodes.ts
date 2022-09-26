export enum LoginEstablishmentErrorCodes {
  INVALID_PASS_OR_EMAIL = 'Invalid email or password, or account not validated yet',
  NotFoundError = 'Invalid email or password, or account not validated yet',
  REQUIRE_TWOFACTOR_CODE = '2FA Token Required',
  INVALID_TWOFACTOR_CODE = 'Invalid 2FA Token',
}
