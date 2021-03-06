import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ProjectTask extends Component {
    onDeleteClick(backlogId, ptId) {
        this.props.deleteProjectTask(backlogId, ptId);
    }

    render() {
        const { projectTask } = this.props;
        let priorityString;
        let priorityClass;
        if (projectTask.priority === 1) {
            priorityClass = "bg-danger text-light";
            priorityString = "HIGH";
        } else if (projectTask.priority === 2) {
            priorityClass = "bg-warning text-light";
            priorityString = "MEDIUM";
        } else if (projectTask.priority === 3) {
            priorityClass = "bg-info text-light";
            priorityString = "LOW";
        }

        return (
            <div className="card mb-3 bg-light">
                <div className={`card-header text-primary text-center ${priorityClass}`}>
                    ID: {projectTask.projectSequence} <br /> 
                    Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{projectTask.summary}</h5>
                    <p className="card-text text-truncate ">
                        {projectTask.acceptanceCriteria}
                    </p>
                    <Link to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button 
                        className="btn btn-danger ml-4" 
                        onClick={
                            this.onDeleteClick.bind(
                                this, 
                                projectTask.projectIdentifier, 
                                projectTask.projectSequence
                            )
                        }
                    >
                        Delete
                    </button>
                </div>
            </div>
        )
    }
}

ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
}

export default connect(null, { deleteProjectTask })(ProjectTask);