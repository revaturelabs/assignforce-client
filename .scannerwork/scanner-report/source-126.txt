import { Injectable } from '@angular/core';
import { SecurityConfig } from './security-config';

@Injectable()
export class SecurityContext {
  private securityConfig: SecurityConfig;

  constructor() {}

  public setSecurityConfig(config: SecurityConfig) {
    this.securityConfig = config;
  }

  public getSecurityConfig() {
    return this.securityConfig;
  }
}
