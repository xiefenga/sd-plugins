import React, { useEffect, useState, useCallback } from "react";
import { Input, Select, message, Row, Col, Switch, InputNumber, Button, Divider } from "antd";
import { Upload } from "../Upload";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { isEqual } from "lodash";
const { Option } = Select;
const { Dragger } = Upload;
const accept = "image/png, image/jpeg, image/jpg";
const baseURL = `/sdata/rest`;
const DesignConfiguration = (props) => {
  const { changeConfiguration, configuration } = props;
  const [canCarousel, setCanCarousel] = useState(configuration.canCarousel === false ? configuration.canCarousel : true);
  const [carouselTime, setCarouselTime] = useState(configuration?.carouselTime ? parseInt(configuration.carouselTime / 1000) : 8);
  const [dispositionList, setDispositionList] = useState(configuration.dispositionList ? configuration.dispositionList : []);
  const [modelInfo, setModelInfo] = useState({
    toppicName: "123",
    canCarousel: true,
    carouselTime: 8,
    containerId: "",
    tabnames: "",
    iconSize: "",
    nameSize: "",
    nameColor: "",
    tabIcon1: "",
    tabIcon2: "",
    tabIcon3: "",
    tabLink1: "",
    tabLink2: "",
    tabLink3: "",
  });
  const [tabIcon1, setTabIcon1] = useState("");
  const [tabIcon2, setTabIcon2] = useState("");
  const [tabIcon3, setTabIcon3] = useState("");
  const [containerId, setContainerId] = useState(configuration?.containerId);
  const [containerList, setContainerList] = useState([]);
  const [tabnames, setTabNames] = useState(configuration?.tabnames || "");
  const [tabLink1, setTabLink1] = useState(configuration?.tabLink1 || "");
  const [tabLink2, setTabLink2] = useState(configuration?.tabLink2 || "");
  const [tabLink3, setTabLink3] = useState(configuration?.tabLink3 || "");
  const [iconSize, setIconSize] = useState(configuration?.iconSize || "40px");
  const [nameSize, setNameSize] = useState(configuration?.nameSize || "18px");
  const [nameColor, setNameColor] = useState(configuration?.nameColor || "black");
  useEffect(() => {
    getContainerId();
  }, []);

  //新增配置
  const addNew = () => {
    let message = dispositionList;
    message.push({
      toppicName: "",
      canCarousel: true,
      carouselTime: 8,
      containerId: "",
      tabnames: "",
      iconSize: "",
      nameSize: "",
      nameColor: "",
      tabIcon1: "",
      tabIcon2: "",
      tabIcon3: "",
      tabLink1: "",
      tabLink2: "",
      tabLink3: "",
    });
    setDispositionList([...message]);
    console.log(dispositionList);
  };
  //获取容器列表
  const getContainerId = () => {
    const { bigscreen = {} } = props;
    const { blocks = [] } = bigscreen;
    let res = [];
    blocks.forEach((item) => {
      if (item?.baseConfig?.type === "container") {
        res.push(item?.baseConfig);
      }
    });
    setContainerList(res);
  };

  //上传图片之前进行验证
  const beforeUpload = (file) => {
    let name = file.name;
    let suffix = name.substring(name.lastIndexOf(".") + 1);
    return new Promise((resolve, reject) => {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type) || suffix === "jfif") {
        message.error("请选择png、jpg、jpeg图片");
        reject(file);
      } else {
        resolve(file);
      }
    });
  };

  //上传图片之后
  const onUploadFinished = (index, posIndex, { file }) => {
    const { status, response } = file;
    let message = dispositionList;
    if (status === "done") {
      const { result } = response;
      // setImageArr(result);
      if (posIndex === 1) {
        message[index].tabIcon1 = result;
        setDispositionList([...message]);
        // setTabIcon1(result);
      } else if (posIndex === 2) {
        message[index].tabIcon2 = result;
        setDispositionList([...message]);
        // setTabIcon2(result);
      } else {
        message[index].tabIcon3 = result;
        setDispositionList([...message]);
        // setTabIcon3(result);
      }
      console.log(dispositionList);
    } else if (status === "error") {
      message.error("上传出错，请重试");
    }
  };

  //处理容器ID选择框变化
  const handleIDSelect = (index, val) => {
    let message = dispositionList;
    message[index].containerId = val;
    setDispositionList([...message]);
  };

  //处理页签名称数据输入
  const handleNameInput = (index, e) => {
    let message = dispositionList;
    message[index].tabnames = e.target.value;
    setDispositionList([...message]);
  };
  //处理页签名称数据输入
  const handleToppicName = (index, e) => {
    let message = dispositionList;
    message[index].toppicName = e.target.value;
    setDispositionList([...message]);
  };

  //处理链接输入
  const handleLinkInput = (index, type, val) => {
    let message = dispositionList;
    switch (type) {
      case 1: {
        message[index].tabLink1 = val;
        setDispositionList([...message]);
        break;
      }
      case 2: {
        message[index].tabLink2 = val;
        setDispositionList([...message]);
        break;
      }
      case 3: {
        message[index].tabLink3 = val;
        setDispositionList([...message]);
        break;
      }
    }
  };

  //处理是否轮播
  const handleCanCarousel = (index, checked) => {
    let message = dispositionList;
    message[index].canCarousel = checked;
    setDispositionList([...message]);
  };

  //处理轮播周期
  const handleTime = (index, value) => {
    let message = dispositionList;
    if (typeof value === "number") {
      message[index].carouselTime = value;
      setDispositionList([...message]);
    }
  };

  const handleSubmit = useCallback(() => {
    const newOptions = {
      dispositionList,
      canCarousel,
      carouselTime: canCarousel ? carouselTime * 1000 : 8000,
      tabIcon1: tabIcon1 || configuration.tabIcon1,
      tabIcon2: tabIcon2 || configuration.tabIcon2,
      tabIcon3: tabIcon3 || configuration.tabIcon3,
      containerId,
      tabnames,
      tabLink1,
      tabLink2,
      tabLink3,
      iconSize,
      nameSize,
      nameColor,
    };
    if (!isEqual(newOptions, configuration)) {
      changeConfiguration({ ...configuration, ...newOptions });
    }
  });

  //处理删除图片
  const handleDeleteIcon = (index, pos) => {
    let message = dispositionList;
    switch (pos) {
      case 1: {
        message[index].tabIcon1 = "";
        setDispositionList([...message]);
        break;
      }
      case 2: {
        message[index].tabIcon1 = "";
        setDispositionList([...message]);
        break;
      }
      case 3: {
        message[index].tabIcon1 = "";
        setDispositionList([...message]);
        break;
      }
    }
  };

  //处理页签名称颜色
  const handleColor = (index, e) => {
    let message = dispositionList;
    message[index].nameColor = e.target.value;
    setDispositionList([...message]);
  };

  //处理页签名称大小
  const handleNameSize = (index, e) => {
    let message = dispositionList;
    message[index].nameSize = e.target.value;
    setDispositionList([...message]);
  };

  //处理图标大小
  const handleIconSize = (index, e) => {
    let message = dispositionList;
    message[index].iconSize = e.target.value;
    setDispositionList([...message]);
  };

  return (
    <>
      {dispositionList.map((item, index) => (
        <div key={index}>
          <Row>
            <Col span={24} className="rowtitle">
              主题名称
            </Col>
            <Input value={item.toppicName} onChange={(e) => handleToppicName(index, e)} />
          </Row>
          <Row>
            <Col span={12} className="rowtitle">
              是否开启轮播
            </Col>
            <Col span={12}>
              <Switch checked={item.canCarousel} onChange={(e) => handleCanCarousel(index, e)}></Switch>
            </Col>
          </Row>
          {canCarousel && (
            <Row>
              <Col span={24} className="rowtitle">
                轮播间隔时间
              </Col>
              <InputNumber value={item.carouselTime} onChange={(e) => handleTime(index, e)} />
            </Row>
          )}
          <Row>
            <Col span={24} className="rowtitle">
              链接关联的容器
            </Col>
            <Select className="nameselect" value={item.containerId} onChange={(e) => handleIDSelect(index, e)}>
              {containerList.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签名称
            </Col>
            <Input value={item.tabnames} onChange={(e) => handleNameInput(index, e)} />
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签图标大小
            </Col>
            <Input value={item.iconSize} onChange={(e) => handleIconSize(index, e)} />
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签名称大小
            </Col>
            <Input value={item.nameSize} onChange={(e) => handleNameSize(index, e)} />
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签名称颜色
            </Col>
            <Input value={item.nameColor} onChange={(e) => handleColor(index, e)} />
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签一图标
            </Col>
            <div className="upload-picture">
              <Dragger
                accept={accept}
                action={`${baseURL}/image/uploadPic?category=4`}
                onChange={(e) => onUploadFinished(index, 1, e)}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                <div className="upload-wrapper">
                  <div className="ant-upload-drag-icon">{item.tabIcon1 ? <img src={item.tabIcon1} className="backgroundImg" /> : <InboxOutlined />}</div>
                  {item.tabIcon1 && (
                    <span className="plugin_deleteIcon">
                      <DeleteOutlined className="removeIcon" onClick={() => handleDeleteIcon(index, 1)} />
                    </span>
                  )}
                  {!item.tabIcon1 && <div className="ant-upload-text">上传图标</div>}
                </div>
              </Dragger>
            </div>
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签二图标
            </Col>
            <div className="upload-picture">
              <Dragger
                accept={accept}
                action={`${baseURL}/image/uploadPic?category=4`}
                onChange={(e) => onUploadFinished(index, 2, e)}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                <div className="upload-wrapper">
                  <div className="ant-upload-drag-icon">{item.tabIcon2 ? <img src={item.tabIcon2} className="backgroundImg" /> : <InboxOutlined />}</div>
                  {item.tabIcon2 && (
                    <span className="plugin_deleteIcon">
                      <DeleteOutlined className="removeIcon" onClick={() => handleDeleteIcon(index, 2)} />
                    </span>
                  )}
                  {!item.tabIcon2 && <div className="ant-upload-text">上传图标</div>}
                </div>
              </Dragger>
            </div>
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签三图标
            </Col>
            <div className="upload-picture">
              <Dragger
                accept={accept}
                action={`${baseURL}/image/uploadPic?category=4`}
                onChange={(e) => onUploadFinished(index, 3, e)}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                <div className="upload-wrapper">
                  <div className="ant-upload-drag-icon">{item.tabIcon3 ? <img src={item.tabIcon3} className="backgroundImg" /> : <InboxOutlined />}</div>
                  {item.tabIcon3 && (
                    <span className="plugin_deleteIcon">
                      <DeleteOutlined className="removeIcon" onClick={() => handleDeleteIcon(index, 3)} />
                    </span>
                  )}
                  {!item.tabIcon3 && <div className="ant-upload-text">上传图标</div>}
                </div>
              </Dragger>
            </div>
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签一跳转链接
            </Col>
            <Input value={item.tabLink1} onChange={(e) => handleLinkInput(index, 1, e.target.value)} />
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签二跳转链接
            </Col>
            <Input value={item.tabLink2} onChange={(e) => handleLinkInput(index, 2, e.target.value)} />
          </Row>
          <Row>
            <Col span={24} className="rowtitle">
              页签三跳转链接
            </Col>
            <Input value={item.tabLink3} onChange={(e) => handleLinkInput(index, 3, e.target.value)} />
          </Row>
          <Divider />
        </div>
      ))}
      <Button type="primary" onClick={addNew}>
        新增主题配置
      </Button>
      <Row>
        <div className="detail-btn" onClick={handleSubmit}>
          执行
        </div>
      </Row>
    </>
    // <div>
    //   <Row>
    //     <Col span={12} className="rowtitle">是否开启轮播</Col>
    //     <Col span={12}>
    //       <Switch checked={canCarousel} onChange={handleCanCarousel}></Switch>
    //     </Col>
    //   </Row>
    //   {
    //     canCarousel && (
    //       <Row>
    //         <Col span={24} className="rowtitle">轮播间隔时间</Col>
    //         <InputNumber value={carouselTime} onChange={handleTime} />
    //       </Row>
    //     )
    //   }
    //   <Row>
    //     <Col span={24} className="rowtitle">链接关联的容器</Col>
    //     <Select className="nameselect" value={containerId} onChange={handleIDSelect}>
    //       {
    //         containerList.map(item => (
    //           <Option value={item.id}>{item.name}</Option>
    //         ))
    //       }
    //     </Select>
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签名称</Col>
    //     <Input value={tabnames} onChange={handleNameInput} />
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签图标大小</Col>
    //     <Input value={iconSize} onChange={handleIconSize} />
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签名称大小</Col>
    //     <Input value={nameSize} onChange={handleNameSize} />
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签名称颜色</Col>
    //     <Input value={nameColor} onChange={handleColor} />
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签一图标</Col>
    //     <div className="upload-picture">
    //       <Dragger
    //         accept={accept}
    //         action={`${baseURL}/image/uploadPic?category=4`}
    //         onChange={e => onUploadFinished(1, e)}
    //         beforeUpload={beforeUpload}
    //         showUploadList={false}
    //       >
    //         <div className="upload-wrapper">
    //           <div className="ant-upload-drag-icon">
    //             {tabIcon1 ? (
    //               <img src={tabIcon1} className="backgroundImg" />
    //             ) : (
    //               <InboxOutlined />
    //             )}
    //           </div>
    //           {
    //             tabIcon1 && (
    //               <span className="plugin_deleteIcon">
    //                 <DeleteOutlined className="removeIcon" onClick={() => handleDeleteIcon(1)} />
    //               </span>
    //             )
    //           }
    //           {
    //             !tabIcon1 && (
    //               <div className="ant-upload-text">上传图标</div>
    //             )
    //           }
    //         </div>
    //       </Dragger>
    //     </div>
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签二图标</Col>
    //     <div className="upload-picture">
    //       <Dragger
    //         accept={accept}
    //         action={`${baseURL}/image/uploadPic?category=4`}
    //         onChange={e => onUploadFinished(2, e)}
    //         beforeUpload={beforeUpload}
    //         showUploadList={false}
    //       >
    //         <div className="upload-wrapper">
    //           <div className="ant-upload-drag-icon">
    //             {tabIcon2 ? (
    //               <img src={tabIcon2} className="backgroundImg" />
    //             ) : (
    //               <InboxOutlined />
    //             )}
    //           </div>
    //           {
    //             tabIcon2 && (
    //               <span className="plugin_deleteIcon">
    //                 <DeleteOutlined className="removeIcon" onClick={() => handleDeleteIcon(2)} />
    //               </span>
    //             )
    //           }
    //           {
    //             !tabIcon2 && (
    //               <div className="ant-upload-text">上传图标</div>
    //             )
    //           }
    //         </div>
    //       </Dragger>
    //     </div>
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签三图标</Col>
    //     <div className="upload-picture">
    //       <Dragger
    //         accept={accept}
    //         action={`${baseURL}/image/uploadPic?category=4`}
    //         onChange={e => onUploadFinished(3, e)}
    //         beforeUpload={beforeUpload}
    //         showUploadList={false}
    //       >
    //         <div className="upload-wrapper">
    //           <div className="ant-upload-drag-icon">
    //             {tabIcon3 ? (
    //               <img src={tabIcon3} className="backgroundImg" />
    //             ) : (
    //               <InboxOutlined />
    //             )}
    //           </div>
    //           {
    //             tabIcon3 && (
    //               <span className="plugin_deleteIcon">
    //                 <DeleteOutlined className="removeIcon" onClick={() => handleDeleteIcon(3)} />
    //               </span>
    //             )
    //           }
    //           {
    //             !tabIcon3 && (
    //               <div className="ant-upload-text">上传图标</div>
    //             )
    //           }
    //         </div>
    //       </Dragger>
    //     </div>
    //   </Row >
    //   <Row>
    //     <Col span={24} className="rowtitle">页签一跳转链接</Col>
    //     <Input value={tabLink1} onChange={e => handleLinkInput(1, e.target.value)} />
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签二跳转链接</Col>
    //     <Input value={tabLink2} onChange={e => handleLinkInput(2, e.target.value)} />
    //   </Row>
    //   <Row>
    //     <Col span={24} className="rowtitle">页签三跳转链接</Col>
    //     <Input value={tabLink3} onChange={e => handleLinkInput(3, e.target.value)} />
    //   </Row>
    //   <Row>
    //     <div className="detail-btn" onClick={handleSubmit}>
    //       执行
    //     </div>
    //   </Row>
    // </div>
  );
};

DesignConfiguration.propTypes = {};

export default DesignConfiguration;
