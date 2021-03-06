import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TypesButton from "./TypesButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Heading = styled.h5`
  padding: 2rem 0rem 2.5rem 9rem;
  font-size: 1.5rem;
  font-weight: 700;
  opacity: 0.9;
  color: white;
  @media screen and (max-width: 768px) {
    display: none;
    transform: translateY(-100%);
  }
`;

const Container = styled.div`
  width: 80%;
  height: 80%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: #7393b3;
  border-radius: 10px;
  border: 1px solid #0c6ca1;
  opacity: 0.8;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 6px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    transition: 0.8s all ease;
    border: none;
    border-radius: 0px;
    display: flex;
    flex-direction: column;
  }
`;

const LargeContainer = styled.div`
  border-right: 1px solid #0c6ca1;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  @media screen and (max-width: 768px) {
    transition: 0.8s all ease;
    border: none;
  }
`;

const JobDiv = styled.div`
  border-bottom: 1px solid #0c6ca1;
`;

const JobTitle = styled.h5`
  margin: 1rem 2rem 1rem 4rem;
  font-size: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const Description = styled.p`
  margin: 1rem 2rem 1rem 4rem;
  font-size: 1rem;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
`;

const PriceAndLevel = styled.div`
  border-bottom: 1px solid #0c6ca1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Price = styled.p`
  margin: 1rem 0;
`;

const Level = styled.p`
  margin: 1rem 0;
`;

const ProjectType = styled.p`
  margin: 1rem 0 1rem 4rem;
  span {
    font-weight: bold;
  }
`;

const SkillsAndExpert = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #0c6ca1;
  align-items: flex-start;
`;

const SkillExpert = styled.p`
  margin: 1rem 0 1rem 4rem;
  font-weight: bold;
`;

const Category = styled.p`
  margin: 1rem 0 0 4rem;
  font-weight: bold;
`;

const GroupButton = styled.div`
  margin: 0.3rem 0 1.2rem 4rem;
`;

const Activity = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0 0 4rem;
`;

const ActJob = styled.p`
  margin: 1rem 0;
  font-size: 1.2rem;
  color: black;
  font-weight: bold;
`;

const Prop = styled.p`
  margin: 0.8rem 0;
`;
const Interview = styled.p`
  margin: 0.8rem 0;
`;
const Invite = styled.p`
  margin: 0.8rem 0;
`;
const Unanswered = styled.p`
  margin: 0.8rem 0;
`;

const SmallContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const FirstContainer = styled.div`
  border-bottom: 1px solid #0c6ca1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
`;

const SubmitButton = styled.button`
  border: 1px solid #0c6ca1;
  border-radius: 160px;
  background-color: #0c6ca1;
  color: #ecf7fc;
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 1.5rem auto 0.5rem auto;
  font-size: 15px;
  width: 160px;
  cursor: pointer;
  &:hover {
    border: 1px solid #0c6ca1;
    background-color: #ecf7fc;
    color: #0c6ca1;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const BookMark = styled.button`
  border: 1px solid red;
  border-radius: 160px;
  background-color: #fff;
  color: red;
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 0.5rem auto 1.5rem auto;
  font-size: 15px;
  width: 160px;
  cursor: pointer;
  &:hover {
    border: 1px solid red;
    background-color: red;
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const ChatButton = styled.button`
  border: 1px solid green;
  border-radius: 160px;
  background-color: #fff;
  color: green;
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 0.5rem auto 1.5rem auto;
  font-size: 15px;
  width: 160px;
  cursor: pointer;
  &:hover {
    border: 1px solid green;
    background-color: green;
    color: #fff;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const SecondContainer = styled.div`
  border-bottom: 1px solid #0c6ca1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -65px;
`;

const About = styled.h5`
  margin-top: 1.3rem;
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const Payement = styled.p`
  font-weight: 200;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const Country = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-bottom: 0.2rem;
`;

const Con = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const Name = styled.p`
  margin-right: 0.5rem;
`;

const Posted = styled.p``;

const JobPosted = styled.h5`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-bottom: 0.2rem;
`;

const Jp = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const HireRate = styled.p``;

const OpenJob = styled.p``;

const Education = styled.h5`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const Member = styled.p`
  font-weight: 200;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const ThirdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const JobLink = styled.h5`
  margin-top: 1.3rem;
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  width: 62%;
  padding: 1rem 1.5rem;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
  cursor: not-allowed;
`;

const CopyLink = styled.p`
  margin-left: 2rem;
  color: #0c6ca1;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const JobDetails = () => {
  const navigate = useNavigate();
  const { username, id } = useParams();
  const [mode, setMode] = useState("");
  const [job, setJob] = useState({});

  const submitProposal = () => {
    navigate(`/submitProposal/${username}/${id}`,{replace:true});
  };

  const success = () => {
    toast("Proposal has been accepted successfully!");
  };

  const incorrect = () => {
    toast("There was an error while accepting the proposal!");
  };

  const acceptProposal = async () => {
    let res = await axios.put(
      `https://young-cliffs-72209.herokuapp.com/changeToCurrent/${job._id}`
    );
    if (res.data == "success") {
      success();
      setTimeout(() => {
        navigate(`/dashboard/${username}`);
      }, 2000);
    } else {
      incorrect();
    }
  };

  const Reject = () => {};

  const Chat = () => {
    navigate(`/messages/${job.client}/${job.freelancer}`,{replace:true});
  };

  useEffect(() => {
    async function fetchData(){
    let res = await axios.get(
      `https://young-cliffs-72209.herokuapp.com/user/${username}`
    );
    setMode(res.data.mode);
    if (mode === "selling") {
      res = await axios.get(
        `https://young-cliffs-72209.herokuapp.com/job/${id}`
      );
      setJob(res.data);
    } else if (mode === "buying") {
      res = await axios.get(
        `https://young-cliffs-72209.herokuapp.com/getApplication/${id}`
      );
      setJob(res.data);
    }
  }
  fetchData();
  }, [mode, id, username]);
  return (
    <div style={{ backgroundColor: "#effffd" }}>
      <Navbar username={username} mode={mode} />
      <Header username={username} />
      <MainContainer>
        <Heading>
          {mode === "selling" ? "Job Details" : "Application Details"}
        </Heading>
        <h2 style={{ marginLeft: 100, color: "white" }}>
          {mode === "selling"
            ? "Client: " + job.client
            : "Freelancer: " + job.freelancer}
        </h2>
        <Container>
          <LargeContainer>
            <JobDiv>
              <JobTitle>Title: {job.title}</JobTitle>
            </JobDiv>
            <JobDiv>
              <Description>
                Description: <br />
                <br />
                {job.description}
              </Description>
              {mode === "buying" ? (
                <Description>
                  Cover Letter: <br />
                  <br />
                  {job.cover}
                </Description>
              ) : (
                <></>
              )}
            </JobDiv>
            <PriceAndLevel>
              <Price>Budget: {job.budget}</Price>
              <Level>Level: {job.level}</Level>
            </PriceAndLevel>
            <JobDiv>
              <ProjectType>
                <span>Project Type: </span>
                {job.type}
              </ProjectType>
            </JobDiv>
            <SkillsAndExpert>
              <SkillExpert>Skills and Expertise</SkillExpert>
              {job.skills ? (
                job.skills.map((skill, index) => {
                  return <Category>{skill}</Category>;
                })
              ) : (
                <Category>N/A</Category>
              )}
              <div style={{ marginTop: 20 }}></div>
            </SkillsAndExpert>
            <Activity>
              <ActJob>Activity on this job</ActJob>
              <Prop>Proposals: Less than 5</Prop>
              <Interview>Interviewing: 0</Interview>
              <Invite>Invites sent: 0</Invite>
              <Unanswered>Unanswered invites: 0</Unanswered>
            </Activity>
          </LargeContainer>
          <SmallContainer>
            <FirstContainer>
              {mode === "selling" ? (
                <SubmitButton onClick={submitProposal}>
                  {"Submit Proposal"}
                </SubmitButton>
              ) : (
                <SubmitButton onClick={acceptProposal}>
                  {"Accept Proposal"}
                </SubmitButton>
              )}
              {mode === "buying" ? (
                <>
                  <BookMark onClick={Reject}>Reject</BookMark>
                  <ChatButton onClick={Chat}>Chat</ChatButton>
                </>
              ) : (
                <></>
              )}
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                background="#EE0022"
              />
            </FirstContainer>
            <SecondContainer>
              <About>About the client</About>
              <Payement>Payment method not verified</Payement>
              <Country>Jordan</Country>
              <Con>
                <Name>Amman</Name>
                <Posted>10.34pm</Posted>
              </Con>
              <JobPosted>1 job posted</JobPosted>
              <Jp>
                <HireRate>0% hire rate,</HireRate>
                <OpenJob>1 open job</OpenJob>
              </Jp>
              <Education>Education</Education>
              <Member>Member since Mar 18, 2022</Member>
            </SecondContainer>
            <ThirdContainer>
              <JobLink>Job link</JobLink>
              <InputField
                value="https://www.upwork.com/jobs/~0164284a27b7bfaa27"
                disabled
              />

              <CopyLink>Copy link</CopyLink>
            </ThirdContainer>
          </SmallContainer>
        </Container>
      </MainContainer>
      <Footer />
    </div>
  );
};

export default JobDetails;
