/**
* React-Upload
*
* Standalone component to upload a file
*
* Author: Alexandre PENOMBRE <aluzed@gmail.com>
* Copyright (c) 2017
*/
import React from 'react';

export default class DropZone extends React.Component {

  constructor(props) {
    super(props);
    if(!this.props.url)
      this.props.url = "";

    this.defaultUploadOptions = {};
    this.currentXHR = null;
    this.rate_unit = 'o/s';

    this.state = {
      progress    : 0,
      filename    : "",
      rate        : 0,
      size        : 0,
      isUploading : false,
      isUploaded  : false
    };

    this.sendFile = this.sendFile.bind(this);
    this.startUpload = this.startUpload.bind(this);
    this.stopUpload = this.stopUpload.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
    this.updateSelectedFile = this.updateSelectedFile.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.resetUploadState = this.resetUploadState.bind(this);
    this.uploadFinished = this.uploadFinished.bind(this);
  }

  componentDidMount() {
    let that = this;

    document.addEventListener("dragover", function( event ) {
      // Empêche default d'autoriser le drop
      event.preventDefault();
    }, false);

    document.addEventListener("drop", function( event ) {
      // Empêche default d'autoriser le drop
      event.preventDefault();
    }, false);

    const EnteringDropZone = e => {
      e.currentTarget.classList.add('Drop-Zone-Enter');
    };

    const LeavingDropZone = e => {
      e.currentTarget.classList.remove('Drop-Zone-Enter');
    };

    // Call newFile on drop
    const DropFile = e => {
      if(!!e.dataTransfer) {
        if(e.dataTransfer.files.length > 0)
        that.newFile(e.dataTransfer.files);
      }

      e.currentTarget.classList.remove('Drop-Zone-Enter');
    };

    this.refs.drop_zone.ondragenter = EnteringDropZone;

    this.refs.drop_zone.ondragleave = LeavingDropZone;

    this.refs.drop_zone.ondrop = DropFile;
  }

  openBrowser(incoming_file) {
    incoming_file.click();
  }

  // On new file entering
  newFile(files) {
    if(files.length > 0) {
      this.updateSelectedFile(files[0]);
      this.sendFile(files[0])
        .then(() => {
          this.uploadFinished();
        })
        .catch((err)=>{
          console.log(err);
          this.stopUpload();
        })
    }
  }

  sendFile(file) {
    let that = this;

    return new Promise((resolve, reject) => {

      that.currentXHR   = new XMLHttpRequest();
      let uploadTime1   = null,
        uploadTime2     = null,
        lastUpProgress  = 0;

      // Creating a form data with the file
      let fd = new FormData();
      fd.append('file', file);

      that.currentXHR.open('post', that.props.url);

      for (let k in that.defaultUploadOptions || {}) {
        that.currentXHR.setRequestHeader(k, that.defaultUploadOptions[k]);
      }

      that.currentXHR.onload = e => resolve(e.target);

      that.currentXHR.onerror = e => {
        that.stopUpload();
        reject(e);
      };

      that.currentXHR.onabort = e => that.resetUploadState();

      if (that.currentXHR.upload)
        that.currentXHR.upload.onprogress = e => {
          // Calculate the progress
          let progress = e.loaded / e.total * 100;

          // Calculate the rate
          let rate = 0;

          uploadTime2 = new Date();

          if(!!uploadTime1 && !!uploadTime2) {
            let newUpProgress = 0;
            let diffProgress  = 0;
            let coeff         = 1;
            let speedBps      = 0;
            let speedKbps     = 0;
            let speedMbps     = 0;

            if(lastUpProgress === 0) {
              lastUpProgress = e.loaded;
            }
            else {
              newUpProgress = e.loaded;
              diffProgress = (newUpProgress - lastUpProgress);
              lastUpProgress = newUpProgress; // update lastUpProgress
            }

            let msTime = (uploadTime2 - uploadTime1) / 1000;

            if(msTime > 1) {
              coeff = msTime.toFixed(0);

              if(!isNaN(coeff))
                coeff = parseInt(coeff, 10);

              speedBps = diffProgress / coeff;
              speedKbps = speedBps / 1024;
              speedMbps = speedKbps / 1024;

              that.rate_unit = 'B/s';
              rate = speedBps;

              if(speedBps > 1024){
                that.rate_unit = 'KB/s';
                rate = speedKbps;
              }

              if(speedKbps > 1024){
                that.rate_unit = 'MB/s';
                rate = speedMbps;
              }
            }
            else {
              coeff = (1 / msTime);

              speedBps = diffProgress * coeff;
              speedKbps = speedBps / 1024;
              speedMbps = speedKbps / 1024;

              that.rate_unit = 'B/s';
              rate = speedBps;

              if(speedBps > 1024) {
                that.rate_unit = 'KB/s';
                rate = speedKbps;
              }

              if(speedKbps > 1024) {
                that.rate_unit = 'MB/s';
                rate = speedMbps;
              }
            }

            uploadTime1 = new Date();
          }

          that.updateProgress(progress, rate);
        } // event.loaded / event.total * 100 ; //event.lengthComputable

      that.currentXHR.send(fd);
      uploadTime1 = new Date();
      that.startUpload();
    });
  }

  cancelUpload() {
    if(this.currentXHR) {
      if(window.confirm('Do you really want to abort ?')) {
        this.currentXHR.abort();
      }
    }
  }

  startUpload() {
    this.setState({
      progress    : 0,
      rate        : 0,
      isUploading : true
    });
  }

  stopUpload() {
    this.setState({
      rate        : 0,
      isUploading : false
    });
  }

  updateSelectedFile(file) {
    this.setState({
      filename : file.name,
      size     : file.size
    });
  }

  updateProgress(progress, rate) {
    this.setState({
      progress,
      rate
    });
  }

  resetUploadState() {
    this.setState({
      progress    : 0,
      filename    : "",
      rate        : 0,
      size        : 0,
      isUploading : false,
      isUploaded  : false
    });
  }

  uploadFinished() {
    this.setState({
      progress    : 100,
      isUploaded  : true,
      isUploading : false,
      rate        : 0
    });
  }

  render() {
    const { filename, isUploading, isUploaded, rate, progress } = this.state;
    let actionBtn = null;

    if(isUploading)
      actionBtn = (<button className="btn btn-large btn-cancel" onClick={ e => this.cancelUpload() }> <i className="ion ion-ios-close-outline"></i> Cancel Upload</button>);
    else
      actionBtn = (<button className="btn btn-large btn-upload" onClick={ e => this.openBrowser(this.refs.incoming_file) }> <i className="ion ion-ios-upload-outline"></i> Pick a file</button>);

    let currentFile = null;

    // If Uploading, display filename
    if(filename !== "" && isUploading) {
      currentFile = (
        <div className="Dropped-File">
          <i className="ion ion-document"></i> { filename }
        </div>);
      }
      // Else display the advice
      else {
        currentFile = (
          <h4>Drag your file here</h4>
        );
      }

      let progressZone = null

      if(isUploading) {
        progressZone = (
          <div className="Drop-Progress container-fluid">
            <div className="progress">
              <div className="progress-bar bg-info" role="progressbar"
                style={{width: progress + '%'}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
              </div>
              <div className="progress-info">{progress.toFixed(0) + '% (' + rate.toFixed(0) + this.rate_unit + ')' }</div>
            </div>
            <h5 className="upload-infos">
              <i className="ion ion-load-c upload-icon spin"></i> { "Uploading..." }
            </h5>
          </div>
        );
      }
      else {
        progressZone = (
          <div></div>
        );
      }

      // If upload is finished
      if(isUploaded) {
        progressZone = (
          <div className="Drop-Progress container-fluid">
          <i className="ion ion-checkmark"></i> { "Upload Finished" }
          </div>
        );
      }


      return (
        <div className="Drop-Zone" ref="drop_zone">
          <div className="Drop-Content">
          {currentFile}

          <input type="file" ref="incoming_file" onChange={ e => this.newFile(e.target.files) } className="hidden-file-input" />

          {actionBtn}

          {progressZone}

          </div>
        </div>
      );
    }

  }
