import { FC, ReactNode, useState } from 'react'
import { Image, message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'

interface ImageUploadProps {
  tip: ReactNode
  imageUrl: string
  setImageUrl: (url: string) => void
}

const ImageUpload: FC<ImageUploadProps> = ({
  tip,
  imageUrl, 
  setImageUrl, 
}) => {

  const [loading, setLoading] = useState(false)

  const beforeUpload = (file: RcFile) => {
    const accepts = ['image/png', 'image/jpeg', 'image/gif']
    const isValid = accepts.includes(file.type)
    if(!isValid) {
      message.error('只能上传.png、.jpg、.gif格式图片!')
    }
    return isValid
  }

  const onChange = ({ file }: UploadChangeParam<UploadFile>) => {
    const { status, response } = file
    if (status === 'uploading') {
      setLoading(true)
    } else if(status === 'done') {
      setLoading(false)
      const origin = window.location.origin
      const url: string = response.result[0]
      setImageUrl(
        url.includes(origin)
          ? url.replace(origin, '') 
          : url
      )
    } else if (status === 'error') {
      setLoading(false)
      message.error(response?.message ?? '上传失败')
    }
  }

  const renderUploadButton = () => {
    return loading 
      ? (
        <div>
          <LoadingOutlined /> 
          <div>上传中...</div>
        </div>
      ) : (
        imageUrl 
          ? (
            <Image
              width={62}
              height={62}
              src={imageUrl} 
              preview={false}
            />
          ): (
            <div>
              <PlusOutlined />
              {/* <span>添加</span> */}
              {tip}
            </div>
          )
      )
  }

  return (
    <Upload
      maxCount={1}
      showUploadList={false}
      listType='picture-card'
      action='/sdata/rest/image/upload'
      accept='image/jpg,image/jpeg,image/png,image/bmp'
      onChange={onChange}
      beforeUpload={beforeUpload}
    >
      {renderUploadButton()}
    </Upload>
  )
}

export default ImageUpload