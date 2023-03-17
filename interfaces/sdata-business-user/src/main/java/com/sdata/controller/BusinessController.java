package com.sdata.controller;

import com.sdata.asset.service.AssetService;
import com.sdata.foundation.core.util.ResultInfo;
import com.sdata.meta.asset.AssetDefinition;
import com.sdata.meta.commons.MetadataConstants;
import com.sdata.meta.datasource.AssetDataSource;
import com.sdata.pojo.BusinessUser;
import com.sdata.system.utils.DruidDataSourceCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
@Path("/business")
public class BusinessController {

  @Autowired
  private AssetService assetService;

  /**
   * 获取用户
   */
  @GET
  @Path("/queryUsers")
  @Produces(MediaType.APPLICATION_JSON)
  public String queryUsers(@QueryParam("assetId") String assetId) {
    AssetDefinition assetDefinition = assetService.getById(assetId);
    //获取到数据源信息
    AssetDataSource assetDataSource = assetService.queryDataSourceDetail(assetDefinition);

    String sql = "select * from ZZLL_GJGWRY;";

    try(
      Connection connection = DruidDataSourceCache.get(assetDataSource.getDbSourceDetail());
      PreparedStatement statement = connection.prepareStatement(sql);
     ) {
      ResultSet resultSet = statement.executeQuery();
      List<BusinessUser> list = new ArrayList<>();
      while (resultSet.next()) {
        String MC = resultSet.getString("MC");
        String BDNM = resultSet.getString("BDNM");
        String SFZHM = resultSet.getString("SFZHM");
        String XH = resultSet.getString("XH");
        BusinessUser user = new BusinessUser(MC, BDNM, SFZHM, XH);
        list.add(user);
      }
      return new ResultInfo(MetadataConstants.RespondStatus.SUCESS, "查询成功", list).toString();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }
}
