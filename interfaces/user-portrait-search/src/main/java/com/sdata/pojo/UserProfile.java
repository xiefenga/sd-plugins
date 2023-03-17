package com.sdata.pojo;

public class UserProfile {
    private String login_name;
    private String name;
    private Integer age;
    private String birthday;
    private String office_code;
    private String office_name;
    private String user_tag;
    private String user_idcode;
    private String user_rank;
    private String avatar;

    public UserProfile() {
    }

    public UserProfile(String login_name, String name, Integer age, String birthday, String office_code, String office_name, String user_tag, String user_idcode, String user_rank, String avatar) {
        this.login_name = login_name;
        this.name = name;
        this.age = age;
        this.birthday = birthday;
        this.office_code = office_code;
        this.office_name = office_name;
        this.user_tag = user_tag;
        this.user_idcode = user_idcode;
        this.user_rank = user_rank;
        this.avatar = avatar;
    }

    public String getLogin_name() {
        return login_name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setLogin_name(String login_name) {
        this.login_name = login_name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getOffice_code() {
        return office_code;
    }

    public void setOffice_code(String office_code) {
        this.office_code = office_code;
    }

    public String getOffice_name() {
        return office_name;
    }

    public void setOffice_name(String office_name) {
        this.office_name = office_name;
    }

    public String getUser_tag() {
        return user_tag;
    }

    public void setUser_tag(String user_tag) {
        this.user_tag = user_tag;
    }

    public String getUser_idcode() {
        return user_idcode;
    }

    public void setUser_idcode(String user_idcode) {
        this.user_idcode = user_idcode;
    }

    public String getUser_rank() {
        return user_rank;
    }

    public void setUser_rank(String user_rank) {
        this.user_rank = user_rank;
    }
}
