import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PortalModal from 'COMPONENTS/PortalModal';
import TipsoModal from 'COMPONENTS/TipsoModal';

import { sortByX, validateDate } from 'UTILS/date';
import validator from 'UTILS/validator';
const sortByDate = sortByX('startTime');

import '../../styles/resume_modal.css';

class ResumeModal extends React.Component {
  renderEducations() {
    const { educations } = this.props.resume;
    if (!educations.length) { return }
    const edus = educations.sort(sortByDate).map((edu, index) => {
      const { school, major, education, startTime, endTime} = edu;
      if (!school) { return }
      return (
        <div key={index} className="resume_section_wrapper">
          <div className="resume_info_header">{school}{education ? `, ${education}` : ''}</div>
          <div className="info_text">{validateDate(startTime)}  ~  {validateDate(endTime)}</div>
          <div className="info_text">{major}</div>
          <div className="section_dot"></div>
        </div>
      )
    });

    return (
      <div className="resume_info_wrapper">
        <div className="info_title">
          <i className="fa fa-university" aria-hidden="true"></i>教育经历
        </div><br/>
        <div className="info_wrapper multi_info">
          {edus}
        </div>
      </div>
    )
  }

  renderWorkExperiences() {
    const { workExperiences } = this.props.resume;
    if (!workExperiences.length) { return }
    const exps = workExperiences.map((experience, index) => {
      const { company, url, startTime, endTime, position, projects } = experience;
      if (!company) { return }
      const workProjects = this.renderProjects(projects);
      return (
        <div key={index} className="resume_section_wrapper">
          {validator.url(url) ? (
            <a target="_blank" href={url[0] === 'h' ? url : `//${url}`} className="resume_info_header header_link">
              <i className="fa fa-link" aria-hidden="true"></i>&nbsp;&nbsp;
              {company}
            </a>
          ) : (<div className="resume_info_header">{company}</div>)}
          {position ? `, ${position}` : ''}
          <div className="info_text">{validateDate(startTime)}  ~  {validateDate(endTime)}</div>
          <div>{workProjects}</div>
          <div className="section_dot"></div>
        </div>
      )
    });

    return (
      <div className="resume_info_wrapper">
        <div className="info_title">
          <i className="fa fa-file-text-o" aria-hidden="true"></i>工作经历
        </div><br/>
        <div className="info_wrapper multi_info">
          {exps}
        </div>
      </div>
    )
  }

  renderProjects(projects) {
    return projects.map((project, index) => {
      const { name, details } = project;
      if (!name) { return }
      const projectDetails = details.map((detail, i) => {
        return (
          <li key={i}>
            - {detail}
          </li>
        );
      });
      return (
        <div key={index} className="project_section">
          <div className="info_section">{name}</div>
          <ul className="info_intro">
            {projectDetails}
          </ul>
        </div>
      )
    });
  }

  renderPersonalProjects() {
    const { personalProjects } = this.props.resume;
    if (!personalProjects.length) { return }
    const projects = personalProjects.map((project, index) => {
      const { url, desc, techs, title } = project;
      const projectTechs = techs.map((tech, index) => {
        return (
          <div key={index} className="info_label">
            {tech}
          </div>
        );
      })
      return (
        <div key={index}>
          {validator.url(url) ? (
            <a target="_blank" href={url[0] === 'h' ? url : `//${url}`} className="resume_info_header header_link">
              <i className="fa fa-link" aria-hidden="true"></i>&nbsp;&nbsp;
              {title}
            </a>
          ) : (<div className="resume_info_header">{title}</div>)}
          <div className="info_text">
            {desc}
          </div>
          <div className="info_labels">
            {projectTechs}
          </div>
        </div>
      )
    });

    return (
      <div className="resume_info_wrapper">
        <div className="info_title">
          <i className="fa fa-code" aria-hidden="true"></i>个人项目
        </div><br/>
        <div className="info_wrapper base_info">
          {projects}
        </div>
      </div>
    )
  }

  renderSupplements() {
    const { others } = this.props.resume;
    const { supplements } = others;
    if (!supplements.length) { return }
    const personalSupplements = supplements.map((supplement, index) => {
      return (
        <li key={index}>
          - {supplement}
        </li>
      )
    });

    return (
      <div className="resume_info_wrapper">
        <div className="info_title">
          <i className="fa fa-quote-left" aria-hidden="true"></i>自我评价
        </div><br/>
        <div className="info_wrapper base_info">
          <ul className="info_intro">
            {personalSupplements}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const { onClose, openModal, resume } = this.props;
    const {
      info,
      educations,
      workExperiences,
      personalProjects,
      others
    } = resume;
    return (
      <PortalModal
        showModal={openModal}
        onClose={onClose}>
        <div className="resume_modal_container">
          <div className="resume_modal_wrapper">
            <div className="resume_info_wrapper">
              <div className="info_title">
                <i className="fa fa-vcard-o" aria-hidden="true"></i>基本信息
              </div>
              <br/>
              <div className="info_wrapper base_info">
                <div className="resume_info_header">
                  {info.name}
                  &nbsp;&nbsp;&nbsp;
                  <i className={`fa fa-${info.gender}`} aria-hidden="true"></i>
                </div><br/>
                <div className="info_text">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  &nbsp;&nbsp;{info.location}&nbsp;&nbsp;&nbsp;
                  {info.intention}
                </div>
                <div className="info_text">
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp;{info.email}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <i className="fa fa-mobile" aria-hidden="true"></i>&nbsp;&nbsp;{info.phone}
                </div>
                <div className="info_text">
                  <i className="fa fa-quote-left" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;
                  {others.dream}
                </div>
              </div>
            </div>
            {this.renderEducations()}
            {this.renderWorkExperiences()}
            {this.renderPersonalProjects()}
            {this.renderSupplements()}
          </div>
          { openModal ? <TipsoModal text="按 ESC 即可退出预览"/> : ''}
        </div>
      </PortalModal>
    )
  }
}

ResumeModal.propTypes = {
  openModal: PropTypes.bool,
  onClose: PropTypes.func
};

ResumeModal.defaultProps = {
  openModal: false,
  onClose: () => {}
};

function mapStateToProps(state) {
  return {
    resume: state.resume
  }
}

export default connect(mapStateToProps)(ResumeModal);
