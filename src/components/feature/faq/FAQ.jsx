import React from "react";
import Accordion from "./Accordion";

const FAQ = () => {
  const faqList = [
    {
      id: 1,
      ques: `How many questions are on the theory test UK?`,
      ans: `The exam comprises of 50 multiple-choice questions, and you will be given 57 minutes to answer them. Prior to starting the exam,you will receive guidance on how the test operates, and you will also have the opportunity to attempt a practice question to become familiar with the format of the exam.`,
    },
    {
      id: 2,
      ques: `How do I prepare for my driving theory test?`,
      ans: `The Driver and Vehicle Agency (DVA) suggests that in order to get ready for your theory test, you should go through the Highway Code thoroughly. Also, practice all the questions, attempt mock tests, and practice consistently on our website and
      apps.`,
    },
    {
      id: 3,
      ques: `How do I pass my theory test first time?`,
      ans: `Practice all the sections and take mock tests until  ou feel confident to pass the test. It is not hard to pass the theory test the first time. You can do it and our website and apps will guide you to accomplish the task.`,
    },
    {
      id: 4,
      ques: `What happens if I fail the UK driving theory test?`,
      ans: `If you fail the UK driving theory test, you will need to wait at least 3 working days before you can take it again. You can book another test as soon as the 3 working day period has passed. You will need to pay the test fee again each time you take the test.`,
    },
    {
      id: 5,
      ques: `How do I book the UK driving theory test?`,
      ans: (
        <>
          To book the UK driving theory test, you can do so online through the
          official website of the Driver and Vehicle Standards Agency (DVSA) or
          by phone. Here are the steps to book your test online: Visit the
          official website of the Driver and Vehicle Standards Agency (DVSA) at{" "}
          <a
            className="text-amber-600"
            href="https://www.gov.uk/book-theory-test"
          >
            https://www.gov.uk/book-theory-test
          </a>
          .
        </>
      ),
    },
    {
      id: 6,
      ques: `Can I reschedule my UK driving theory test?`,
      ans: (
        <>
          Yes, you can reschedule your UK driving theory test if necessary. To
          do It online visit{" "}
          <a
            className="text-amber-600"
            href="https://www.gov.uk/change-theory-testor"
          >
            https://www.gov.uk/change-theory-testor
          </a>{" "}
          DVSA customer support on 0300 200 1122 from Monday to Friday, 8 am to
          4 pm.
        </>
      ),
    },
    {
      id: 7,
      ques: `What documents do I need to bring to the UK driving theory test?`,
      ans: (
        <>
          <ol className="list-decimal ml-8">
            <li>Your valid and current UK provisional driving license.</li>
            <li> The confirmation email of your theory test booking</li>
          </ol>
        </>
      ),
    },
    {
      id: 8,
      ques: `How long does it take to get the results of the UK driving theory test?`,
      ans: `Once you finish your test you will receive your result instantly.`,
    },
    {
      id: 9,
      ques: `What score do I need to pass this part of the test?`,
      ans: `If you are taking a car or motorcycle theory test you will need 43/50.`,
    },
    {
      id: 10,
      ques: `How much time will I get to complete the questions?`,
      ans: `You will have 57 minutes to complete the test for Car and Motorcycle.`,
    },
    {
      id: 11,
      ques: `What type of questions will I be asked?`,
      ans: (
        <>
          For car drivers, there are 14 categories which include about 800
          questions in total, 50 of which will be randomly chosen for your test.
          These categories include:
          <ul className="list-decimal ml-8">
            <li>Attitude</li>
            <li>Documents </li>
            <li>Hazard Awareness </li>
            <li>Incidents, Accidents and Emergencies </li>
            <li>Motorway Rules </li>
            <li>Other Types of Vehicles </li>
            <li>Road and Traffic Signs </li>
            <li>Rules of the Road </li>
            <li>Safety and Your Vehicle </li>
            <li>Safety Margins </li>
            <li>Vehicle Handling </li>
            <li>Vehicle Loading </li>
            <li>Vulnerable Road Users</li>
          </ul>
        </>
      ),
    },
    {
      id: 12,
      ques: `Can I take my theory test in a different language?`,
      ans: `You can only take the test in English or Welsh.`,
    },
    {
      id: 13,
      ques: `When should I arrive at the test center?`,
      ans: `15 minutes before your theory test.`,
    },
    {
      id: 14,
      ques: `What is the duration of time that I will spend at the test center?`,
      ans: `The total time you'll spend at the theory test center as a car or motorcycle candidate is approximately two hours. During this time, you'll spend 15 minutes before the test getting checked in and ready, followed by an optional 15-minute practice session (Optional). Then, you'll have 57 minutes to complete the multiple-choice section of the test, followed by a 3-minute break. After the break, you'll have 20 minutes to complete the hazard perception test, and then you'll need to wait for around 5 to 10 minutes to receive your test result.`,
    },
    {
      id: 15,
      ques: `How long does the theory test certificate last?`,
      ans: `2 Years.`,
    },
  ];
  return (
    <div className="bg-slate-300">
      <div
        className="grid lg:grid-cols-[40%_auto] pt-[100px] pb-[50px] mx-4 md:mx-8 gap-4"
        id="faq"
      >
        <div className="flex">
          <h2 className="w-full items-end text-start text-lg md:text-xl text-sky-950">
            UK Driving Licence: Frequently Asked Questions
          </h2>
        </div>
        <div className="flex flex-col">
          {faqList.map((item) => (
            <Accordion key={item.id} ques={item.ques} content={item.ans} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
