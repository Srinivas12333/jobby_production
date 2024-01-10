/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { BsStarFill } from 'react-icons/bs';
import { MdLocationOn, MdWork } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';
import Cookies from 'js-cookie';
import Header from '../Header';
import './index.css';

const appConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

const JobItemDetails = () => {
  const [jobItemDetails, setJobItemDetails] = useState([]);
  const [appStatus, setAppStatus] = useState(appConstants.initial);
  const { id } = useParams();

  useEffect(() => {
    const getJobItemDetails = async () => {
      const jwtToken = Cookies.get('jwt_token');
      const url = `https://apis.ccbp.in/jobs/${id}`;
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok) {
          const { job_details, similar_jobs } = data;
          const jobDetails = {
            companyLogoUrl: job_details.company_logo_url,
            employmentType: job_details.employment_type,
            companyWebsiteUrl: job_details.company_website_url,
            id: job_details.id,
            jobDescription: job_details.job_description,
            location: job_details.location,
            packagePerAnnum: job_details.package_per_annum,
            rating: job_details.rating,
            title: job_details.title,
            skills: job_details.skills.map((eachValue) => ({
              imageUrl: eachValue.image_url,
              name: eachValue.name,
            })),
            lifeAtCompany: {
              description: job_details.life_at_company.description,
              imageUrl: job_details.life_at_company.image_url,
            },
          };
          const similarJobs = similar_jobs.map((eachValue) => ({
            companyLogoUrl: eachValue.company_logo_url,
            employmentType: eachValue.employment_type,
            id: eachValue.id,
            jobDescription: eachValue.job_description,
            location: eachValue.location,
            rating: eachValue.rating,
            title: eachValue.title,
          }));
          const jobItem = { jobDetailss: jobDetails, similarJob: similarJobs };
          setJobItemDetails(jobItem);
          setAppStatus(appConstants.success);
        } else {
          setJobItemDetails([]);
          setAppStatus(appConstants.failure);
        }
      } catch (error) {
        setJobItemDetails([]);
        setAppStatus(appConstants.failure);
      }
    };

    getJobItemDetails();
  }, [id]);

  const tryAgain = () => {
    setAppStatus(appConstants.initial);
    setJobItemDetails();
  };

  const successItemView = () => {
    const { jobDetailss, similarJob } = jobItemDetails;
    const eachValue = jobDetailss;
    const { skills } = eachValue;
    const { lifeAtCompany } = eachValue;
    const similarJobs = similarJob;
  
    return (
      <div className="job-item-success-container">
        <div className="top-container">
        <div className="icon-container">
            <img
              src={eachValue.companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="role-holder">
              <h1 className="role-names">{eachValue.title}</h1>
              <div className="rating-holder">
                <BsStarFill className="star-image" />
                <p className="rating">{eachValue.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-middle-container">
            <div className="location-holder">
              <div className="icon-holder">
                <MdLocationOn className="md-icon" /> 
                <p className="icon-name">{eachValue.location}</p>
              </div>
              <div className="icon-holder">
                <MdWork className="md-icon" />
                <p className="icon-name">{eachValue.employmentType}</p>
              </div>
            </div>
            <p className="salary">{eachValue.packagePerAnnum}</p>
          </div>
          <hr />
          <div className="desc-holder">
            <h1 className="description-heading">Description</h1>
            <a
              href={eachValue.companyWebsiteUrl}
              rel="noreferrer"
              target="_blank"
            >
              <p className="violet-text">
                Visit <BiLinkExternal className="visit" />
              </p>
            </a>
          </div>
          <p className="description-para">{eachValue.jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachItem => (
              <li className="skill-item" key={eachItem.name}>
                <img
                  src={eachItem.imageUrl}
                  className="skill-image"
                  alt={eachItem.name}
                />
                <p className="skill-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-holder">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              className="life-at-company-image"
              alt="life at company"
            />
          </div>
        </div>
        <div className="bottom-container">
          <h1 className="similar-heading">Similar Jobs</h1>
          <ul className="similar-list">
            {similarJobs.map((eachValuee) => (
              <li className="similar-item" key={eachValuee.id}>
                <div className="icon-container">
                <img
                    src={eachValuee.companyLogoUrl}
                    className="company-logo"
                    alt="similar job company logo"
                  />
                  <div className="role-holder">
                    <h1 className="role">{eachValuee.title}</h1>
                    <div className="rating-holder">
                      <BsStarFill className="star-image" />
                      <p className="rating">{eachValuee.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="description">Description</h1>
                <p className="description-para">{eachValuee.jobDescription}</p>
                <div className="job-middle-container">
                  <div className="location-holder">
                  <MdWork className="md-icons" />
                      <p className="icon-names">{eachValuee.employmentType}</p>
                  </div>
                  <p className="salary">{eachValuee.packagePerAnnum}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const failureItemView = () => (
    <div className="main-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={tryAgain}
      >
        Retry
      </button>
    </div>
  );

  const loaderView = () => (
    <div className="main-loader-container">
      <div className="loader-container" data-testid="loader">
        <ThreeDots type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  );

  const getItemView = () => {
    switch (appStatus) {
      case appConstants.success:
        return jobItemDetails.length !== 0 ? successItemView() : failureItemView();
      case appConstants.failure:
        return failureItemView();
      default:
        return loaderView();
    }
  };

  return (
    <div className="job-item-main-container">
      <Header />
      {getItemView()}
    </div>
  );
};

export default JobItemDetails;
