package com.sdata.controller.userPortrait;

import com.sdata.asset.service.AssetService;
import com.sdata.foundation.core.util.ResultInfo;
import com.sdata.meta.asset.AssetDefinition;
import com.sdata.meta.commons.MetadataConstants;
import com.sdata.meta.datasource.AssetDataSource;
import com.sdata.meta.datasource.DbSourceDetail;
import com.sdata.pojo.UserProfile;
import com.sdata.system.rest.system.sys.SysPropertyService;
import com.sdata.system.utils.DruidDataSourceCache;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@Path("/0x1461a0/userPortrait")
public class SearchController {

    @Autowired
    private SysPropertyService sysPropertyService;

    @Autowired
    private AssetService assetService;

    @Value("28S_data_app_info")
    private String DATA_APP_INFO;

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public String search(@QueryParam("key") String key) {
        String assetId = sysPropertyService.queryValueByKey(DATA_APP_INFO);
        if (StringUtils.isBlank(assetId)) {
            return new ResultInfo(MetadataConstants.RespondStatus.ERROR, "未配置的资产id;key:{}", DATA_APP_INFO).toString();
        }
        AssetDefinition assetDefinition = assetService.getById(assetId);
        //获取到数据源信息
        AssetDataSource assetDataSource = assetService.queryDataSourceDetail(assetDefinition);

        DbSourceDetail dbSourceDetail = assetDataSource.getDbSourceDetail();
        String sql = "SELECT * FROM `user_profile_info` WHERE `name` LIKE '%" + key + "%';";
        try(
            Connection connection = DruidDataSourceCache.get(dbSourceDetail)
        ) {
            PreparedStatement statement = connection.prepareStatement(sql);
            ResultSet result = statement.executeQuery();
            List<UserProfile> list = new ArrayList<>();
            while (result.next()) {
                list.add(
                    new UserProfile(
                        result.getString("login_name"),
                        result.getString("name"),
                        result.getInt("age"),
                        result.getString("birthday"),
                        result.getString("office_code"),
                        result.getString("office_name"),
                        result.getString("user_tag"),
                        result.getString("user_idcode"),
                        result.getString("user_rank"),
                        result.getString("avatar")
                    )
                );
            }
            return new ResultInfo(MetadataConstants.RespondStatus.SUCESS, "查询成功", list).toString();
        } catch (SQLException e) {
            log.error(e.getMessage());
            return new ResultInfo(MetadataConstants.RespondStatus.ERROR, "查询出错", e).toString();
        }
    }
}
