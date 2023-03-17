package com.sdata.pojo;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonProperty;

public class BusinessUser {

  @JSONField(name = "MC")
  private String MC;

  @JSONField(name = "BDNM")
  private String BDNM;

  @JSONField(name = "SFZHM")
  private String SFZHM;

  @JSONField(name = "XH")
  private String XH;

  public BusinessUser(){}

  public BusinessUser(String MC, String BDNM, String SFZHM, String XH) {
    this.MC = MC;
    this.BDNM = BDNM;
    this.SFZHM = SFZHM;
    this.XH = XH;
  }

  public String getMC() {
    return MC;
  }

  public void setMC(String MC) {
    this.MC = MC;
  }

  public String getBDNM() {
    return BDNM;
  }

  public void setBDNM(String BDNM) {
    this.BDNM = BDNM;
  }

  public String getSFZHM() {
    return SFZHM;
  }

  public void setSFZHM(String SFZHM) {
    this.SFZHM = SFZHM;
  }

  @JsonProperty("XH")
  public String getXH() {
    return XH;
  }

  public void setXH(String XH) {
    this.XH = XH;
  }
}
