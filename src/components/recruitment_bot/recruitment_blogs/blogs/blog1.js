import React from "react"
import react from "react"
import * as classess from "../static/blog.module.css"
import HeaderRecruitmentBot from "../../main_page/main_page_header/main_page_header.js"
import blog_img1 from "../static/images/blog_img1.jpeg"
import blog_img2 from "../static/images/blog_img2.png"
import facebook_icon from "../static/images/blog_icon_facebook.svg"
import twitter_icon from "../static/images/blog_icon_twitter.svg"
import linkedin_icon from "../static/images/blog_icon_linkedin.svg"
import logo from "../../apply_for_job/static/logo.png"
import logo_webp from "../../apply_for_job/static/logo.webp"
const Blog1 = () => {
  return (
    <React.Fragment>
      <HeaderRecruitmentBot />
      <div className={classess.main_div}>
        <div className={classess.sub_div}>
          <h1 className={classess.main_heading}>
            10 Tips to Hire the Right Interns | RecruitmentBot
          </h1>
          {/* ......................................................Our Blog Line      .......................................... */}

          <div className={classess.our_blog_line}>
            <a>Our Blog</a>{" "}
            <span className={classess.span_text}>
              {" "}
              10 Tips to Hire the Right Interns | RecruitmentBot
            </span>
          </div>

          {/* ................................................Image ...................................... */}

          <img
            src={blog_img1}
            alt="its blog image 1"
            className={classess.blog_img1_setting}
          />
        </div>
        {/* ...........................................icons...........................................       */}

        <div className={classess.social_icons}>
          <h6 className={classess.share_setting}>Share</h6>{" "}
          <img src={facebook_icon} className={classess.icons_setting} />{" "}
          <img src={twitter_icon} className={classess.icons_setting} />{" "}
          <img src={linkedin_icon} className={classess.icons_setting} />
        </div>

        {/* ..........................................text below icons......................................... */}

        <div className={classess.para_setting}>
          <p>
            Even if you’ve seen thousands of resumes in your career, writing
            your own can be a challenge. It’s difficult to evaluate your own
            qualifications, skills, and achievements objectively and describe
            them in a way that really makes your HR resume stand out. <br />{" "}
            <br />
            Working in human resources yourself, you know it’s not easy to grab
            a recruiter or a HR manager’s attention and land an interview.{" "}
            <br /> <br />
            That's why we’ve created this guide! In it, we’ll look at the best
            practices for writing a strong resume for HR roles and help you use
            your own experience in human resources to your advantage.
          </p>
        </div>

        {/* ......................................Dark div with border ............................................  */}

        <div className={classess.dark_div}>
          <h4 className={classess.table_of_contents_setting}>
            Table of contents{" "}
          </h4>
          <ul className={classess.ul_one}>
            <li>The different roles in human resources</li>
            <li>
              How do you make your HR resume stand out?
              <ul>
                <li>Format your resume well</li>
                <li>
                  Give detailed information on your previous workplaces & past
                  achievements{" "}
                </li>
                <li>Add keywords </li>
                <li>Be concise and clear</li>
                <li>Make your resume ATS-ready </li>
                <li>Add details on your tech & digital skills</li>
                <li>
                  Highlight information on relevant certification you’ve passed
                </li>
              </ul>
            </li>
            <li>
              What are the top skills you should highlight for different HR
              roles?{" "}
            </li>
            <li>Follow the best practices to create a powerful HR resume</li>
          </ul>
        </div>

        {/* .......................................................image below dark div .............................  */}

        <img
          src={blog_img2}
          alt="this is blog image 2"
          className={classess.blog_img2_setting}
        />

        <div className={classess.below_img_div}>
          <h2 className={classess.heading_below_img}>
            The different roles in human resources
          </h2>
          <p className={classess.para_setting2}>
            Let’s first look at the different roles in human resources. If
            you’re looking at job ads at large organizations, you might see the
            following positions:
          </p>
          <ul className={classess.ul_two}>
            <li>
              <b>HR Manager:</b> The HR manager creates quarterly and yearly
              hiring strategies, based on the company’s needs. They’re also
              responsible for developing a strong company culture, overseeing
              and improving the communication between employees and the
              employer.{" "}
            </li>
            <br />
            <li>
              <b>HR director: </b>The HR director oversees the functioning of
              the HR department, creates global hiring strategies and defines
              the company’s hiring policies, and helps the HR department
              implement them successfully.
            </li>
            <br />
            <li>
              <b>Recruiter:</b>Recruiters pre-select candidates, based on their
              resumes, and create a candidate pool for the HR manager to look
              at. They implement the employer brand’s strategy designed by the
              HR manager or director.
            </li>
            <br />
            <li>
              <b>HR assistant:</b>HR assistants assist recruiters, HR managers
              and HR directors in their day-to-day tasks, help plan interviewing
              sessions, contact candidates, and more.{" "}
            </li>
            <br />
            <li>
              <b>Benefits specialist: </b>Benefits specialists manage the
              company’s benefits program, which typically includes health
              insurance, a retirement plan, paid leave, shares in the company,
              and more.
            </li>
          </ul>
          <p className={classess.para_setting2}>
            {" "}
            You might also see ads for HR generalists, Training and development
            specialists, and more. Not every company has the same definition of
            what each HR professional does.
          </p>
          <p className={classess.para_setting2}>
            For example, you might notice that most times, job offers for HR
            directors and HR managers are similar and that responsibilities
            sometimes overlap. Read the job offer carefully to decide whether
            it’s a good match for you, and tailor your resume to it.{" "}
          </p>
          <h2 className={classess.heading_below_img}>
            How do you make your HR resume stand out?
          </h2>
          <p className={classess.para_setting2}>
            As a HR professional, the pressure to have a spotless resume that
            truly stands out is even higher than for other roles. In this
            section, we’ll discuss a few strategies that can help you achieve
            that, and receive an invitation for an interview.{" "}
          </p>

          {/* .................................................. */}

          <h3 className={classess.heading_below_img_resume}>
            Format your resume well
          </h3>
          <p className={classess.para_setting2}>
            Make your resume easy to scan. The person who goes through it should
            be able to figure out your experiences and skills and decide whether
            you’re a good fit in a matter of seconds.
            <br />
            <br />
            Use the standard reverse chronological order (listing your last
            position at the top), and include a few different sections: work
            experience, education, core skills, software tools you’ve used in
            the past, and contact details. Add a strong headline that makes your
            profile & desired position instantly recognizable and include a
            summary of 1-2 sentences.{" "}
          </p>

          {/* ........................................................    */}

          <h2 className={classess.heading_below_img_resume}>
            Give detailed information on your previous workplaces & past
            achievements{" "}
          </h2>
          <p className={classess.para_setting2}>
            The Work experience section should be the longest and the most
            detailed one. For each position, add 3 to 5 bullet points on your
            responsibilities and achievements. <br />
            <br />
            Be specific. Add enough details to showcase your skills and
            contributions. For example, you can say that you’ve “achieved an
            increase of 20% of the employee retention rate in 2019”, “recruited
            a team of 15 software developers within 4 months”, “helped reduce
            the time-to-hire by 30%”, and so on.
            <br />
            <br />
            Details and numbers help your readers understand your experience's
            scope and depth and instantly see your strengths. Of course, not all
            of your achievements are quantifiable, which is okay—you can still
            add them. However, it might simply take a little digging to uncover
            details you could actually quantify and add them to your experience.
            <br />
            <br />
            The best strategy is to highlight the experiences in line with the
            job description of the position you’re applying for and show how
            your responsibilities have increased with time.
            <br />
            <br />
            You can also include{" "}
            <a className={classess.anchor_color}>
              information on the companies where you’ve worked:
            </a>{" "}
            number of employees, number of locations, growth rate and important
            milestones, international recruitment initiatives, and more.{" "}
          </p>

          {/* ...............................     */}

          <h3 className={classess.heading_below_img_resume}>Add keywords </h3>
          <p className={classess.para_setting2}>
            Keywords are important for both human and bot readers.
            <a className={classess.anchor_color}>
              Include the keywords from the original job ad in your resume,
            </a>{" "}
            and use formatting to your advantage to help readers scan for them
            and notice them immediately. You can add a “Key skills” or a “Core
            strengths” section, too: this is an excellent opportunity to add
            HR-related keywords and will attract your reader’s attention.
          </p>

          <h3 className={classess.heading_below_img_resume}>
            Be concise and clear
          </h3>
          <p className={classess.para_setting2}>
            Simplicity goes a long way in a resume. Trying to impress recruiters
            with obscure terms and verbose language will almost definitely
            backfire. Nobody has time to decipher lengthy sentences with lots of
            fluff.
            <br /> <br />
            Be concise and use simple sentences instead, and be strategic about
            the way you use white space on your CV. This way, you’re helping the
            details of your past experiences stand out. Cut everything that
            dilutes the key messages.{" "}
          </p>

          {/* ......................................................................... */}

          <h3 className={classess.heading_below_img_resume}>
            Make your resume ATS-ready{" "}
          </h3>
          <p className={classess.para_setting2}>
            You’re in a unique position to know how applicant tracking systems
            (ATS) work from the inside and tweak your resume accordingly. <br />{" "}
            <br />
            Prepare your resume for ATS software by applying the best practices
            for resume formatting and keyword density, and showcase your skills
            in a few different sections (for example, in the Work Experience
            section, and in the Core Skills & Competencies one). <br /> <br />
            If a common industry term is often used as an abbreviation, use both
            the abbreviated and long versions.
          </p>

          {/* .................................................................  */}

          <h3 className={classess.heading_below_img_resume}>
            Add details on your tech & digital skills
          </h3>
          <p className={classess.para_setting2}>
            Using new technologies to streamline the hiring process is a major
            trend in human resources, and it’ll only grow in the next few years.
            According to{" "}
            <a className={classess.anchor_color}>
              PwC’s HR Technology Survey for 2020,
            </a>{" "}
            74% of HR professionals think that tech spending will be increasing,
            while half of them buy enterprise software tools from multiple
            vendors.
            <br />
            <br />
            This essentially means that the more tools you can work with, the
            better chances you have to stand out among other candidates:
            especially if the company is looking for a specific stack of
            technologies.
            <br />
            <br />
            Include specific information on the tools you’ve used in the past:{" "}
          </p>
          <ul className={classess.ul_two}>
            <li>
              HR management systems (HRMS), such as HR Cloud, Sapling, or ADP{" "}
            </li>
            <li>
              Applicant tracking systems (ATS), such as Greenhouse, Oracle
              Taleo, or Jobvite
            </li>
            <li>
              Skills test platforms, such as{" "}
              <a className={classess.anchor_color}>TestGorilla</a>.{" "}
            </li>
          </ul>
          <p className={classess.para_setting2}>
            Remote work is here to stay, so experience with tools that
            facilitate remote hiring, onboarding, training, workflow management
            and planning—such as Zoom.us, Microsoft Teams, Airtable, Notion and
            Slack, among others—is also key. Do you need to include each one? It
            depends on the role itself, and on the requirements. Check the job
            ad for hints on that.
            <br /> <br />
            If you have certifications in specific software programs, add them
            to your resume, as well. Which leads us to the next point:{" "}
          </p>
          {/* ............................................................................ */}

          <h3 className={classess.heading_below_img_resume}>
            Highlight information on relevant certification you’ve passed
          </h3>
          <p className={classess.para_setting2}>
            The Education section is the obvious place where you should put{" "}
            <a className={classess.anchor_color}>
              industry-specific certification information
            </a>
            . Don't leave it at that, though: add it to your headline and
            summary. The Education section gives details, such as year of
            completion, certification type, and certifying institution. <br />
            <br />
            If you’re applying to an entry-level position, this makes your
            education and additional certifications even more important, so you
            can feature details such as your achievements, courses you excelled
            in, and awards you’ve received. <br /> <br />
            Should you add your GPA in your resume, though? Add it if it’s
            impressive and if it helps you stand out; otherwise, you can skip
            it.{" "}
          </p>
          {/* ...................................................... */}

          <h2 className={classess.heading_below_img}>
            What are the top skills you should highlight for different HR roles?
          </h2>
          <p className={classess.para_setting2}>
            In a resume, it’s important to highlight what you want to do, and
            not only concentrate on what you’ve been doing in the past. Include
            information on your top skills, based on your current and desired
            position. If possible, do that by quantifying your achievements,
            which helps provide context and proof. <br />
            <br />
            Below, you can find some ideas about which top skills to accentuate
            on for different HR roles.
          </p>
          <ul className={classess.ul_two}>
            <li>
              <b>Top skills for HR managers and directors:</b> onboarding,
              employee retention, employee relations, human resources
              information software (HRIS), project management, interviewing,
              leadership,
              <a className={classess.anchor_color}>communication</a> ,
              performance management, hiring policies, recruitment strategy,
              benefits administration, and legal.{" "}
            </li>
            <br />
            <li>
              <b>Top skills for recruiters: </b>
              <a className={classess.anchor_color}>
                communication, talent acquisition
              </a>
              , sales and marketing, time management, negotiation, project
              management, screening, emotional intelligence, human resources
              information software (HRIS).
            </li>
            <br />
            <li>
              <b>Top skills for HR assistants: </b>time management, scheduling,
              attention to detail,
              <a className={classess.anchor_color}> communication</a> ,
              reliability, and more.
            </li>
            <br />
          </ul>
          <p className={classess.para_setting2}>
            Pay special attention to the required skills from the original job
            posting and include them in your resume multiple times (but avoid
            keyword stuffing).{" "}
          </p>

          {/* ........................................................... */}

          <h2 className={classess.heading_below_img}>
            Follow the best practices to create a powerful HR resume
          </h2>
          <p className={classess.para_setting2}>
            To create a powerful resume for a HR role, use the best practices
            outlined above: use good formatting and make your resume easy to
            scan, give metrics and details about your achievements, write a
            strong summary and a headline. <br />
            <br />
            The writing style is just as important as the information itself: be
            concise and use brief sentences. Include relevant keywords based on
            the job ad and change your resume for each position you’re applying
            to. This might sound like a lot of work, but is likely to yield much
            better results than sending the same CV to a lot of companies at
            once, without personalizing it.
            <br />
            <br />
            Besides all that, you can ask someone from your personal or
            professional network to review your resume and give you tips on how
            to improve it. As a HR professional, you likely have a ton of peers
            in HR who can help you with that: just scan your LinkedIn
            connections for ideas, and offer help in return.
          </p>

          <div className={classess.social_icons2}>
            <img src={twitter_icon} className={classess.icons_setting} />{" "}
            <img src={linkedin_icon} className={classess.icons_setting} />{" "}
            <h6 className={classess.share_setting}>Share</h6>
          </div>
        </div>
      </div>
      <div className={classess.footer}>
        <div className={classess.logo_styling}>
          <picture>
            <source srcset={logo_webp} type="image/webp" />
            <source srcset={logo} type="image/png" />
            <img srcset={logo_webp} alt="Botnostic Solutions" />
          </picture>
        </div>
        <div className={classess.footer_space}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h5>Contact US:</h5>
                <p>+92302-8557775</p>
              </div>
              <div className="col-lg-4">
                <h5> Address:</h5>
                <p>CIE Building NUST-H12 Islamabad, Pakistan</p>
              </div>
              <div className="col-lg-4">
                <h5 className={classess.email_setting}>Email Us:</h5>
                <div className={classess.email_button}>
                  {" "}
                  <a href="mailto:info@mycareerdreams.com">Email Us</a>
                </div>
              </div>
            </div>
          </div>

          <div className={classess.last_line}>
            <p>{`© ${new Date().getFullYear()} Botnostic Solutions (PVT) Ltd, All Rights Reserved`}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Blog1
