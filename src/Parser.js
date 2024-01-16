export default function Parser (props){

    const readHeader = (data) => {
      const params={}
      const splited = data.split('\n')
      for (var i=0; i<splited.length; i+=3){
        switch(splited[i]){
          case 'SIZES:':
            const size = splited[i+1].split(' ')
            params['X']=parseInt(size[0])
            params['Y']=parseInt(size[1])
            params['Z']=parseInt(size[2])
            break
          case 'VOXEL_DIMS:':
            const vox_dim = splited[i+1].split(' ')
            params['spaceX']=parseFloat(vox_dim[0])
            params['spaceY']=parseFloat(vox_dim[1])
            params['spaceZ']=parseFloat(vox_dim[2])
            break
          case 'DICOM_THRESHOLDS:':
            const tresholds = splited[i+1].split(' ')
            params['intercept']=parseInt(tresholds[0])
            params['windowCenter']=parseInt(tresholds[1])
            params['windowWidth']=parseInt(tresholds[2])
            params['slope']=parseInt(tresholds[3])
            break
          default:
            break
        }
      }
      return params
    }

    const handleFolderChange = async () => {
        const picture = {}
        const header = []
        const dirHandle = await window.showDirectoryPicker()
        
        for await (const fileHandle of dirHandle.values()) {
          const fileName = fileHandle.name
          const name = fileName.split('.')[0]
          const reader = new FileReader()
          const file = await fileHandle.getFile()
          
          if (fileName.includes(".header")){
            const loadedFile = await new Promise((resolve, reject) => {
              reader.onload = () => resolve(reader.result)
              reader.onerror = reject
              reader.readAsText(file)
            })  
            // header.push([name,readHeader(loadedFile)])
            header[name] = readHeader(loadedFile)
          } else {
            const loadedFile = await new Promise((resolve, reject) => {
              reader.onload = () => resolve(reader.result)
              reader.onerror = reject
              reader.readAsArrayBuffer(file)
            }) 
            const fileContent = new Uint16Array(loadedFile)
            picture[name]=fileContent
          }
        }
        return [header,picture]
      }
    
    const startPars = async() =>{
        const data = await handleFolderChange()
        props.setHeaders(data[0])
        props.setPictures(data[1])
    }

    return(
        <>
            <button type="button" class="btn btn-secondary" onClick={startPars}>Wybierz folder</button>
        </>
    )
}