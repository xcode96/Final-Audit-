import type { SectionData, Question, QuestionPriority } from './types';
import {
  ShieldIcon,
  UsersIcon,
  LockIcon,
  CodeIcon,
  ContextIcon,
  LeadershipIcon,
  PlanningIcon,
  SupportIcon,
  OperationIcon,
  PerformanceIcon,
  ImprovementIcon,
} from './components/icons';

const enrichQuestions = (questions: string[]): Question[] => {
  const priorities: QuestionPriority[] = ['Essential', 'Advanced', 'Optional'];
  return questions.map((q, index) => {
    const priority = priorities[index % priorities.length];
    return {
      text: q,
      priority: priority,
      description: `Meaning: The assessor is asking whether the organization has a formal, documented process or control for the following: "${q}". Evidence could include relevant policies, procedures, logs, or system configurations.`
    };
  });
};


export const CHECKLIST_DATA: SectionData[] = [
    {
    "id": "iso-clauses",
    "title": "ISO :27001 Clauses",
    "description": "Core requirements for establishing, implementing, maintaining and continually improving an ISMS.",
    "color": "yellow",
    "icon": LockIcon,
    "subSections": [
      {
        "id": "4.1",
        "title": "4.1 Understanding organization and its context",
        "questions": enrichQuestions([
          "Have the internal and external issues that are relevant to the organization's ISMS determined",
          "Have impact and the risk associated to the issues determined",
          "Have the remediation plan for issues documented"
        ])
      },
      {
        "id": "4.2",
        "title": "4.2 Understanding the needs and expectations of interested parties",
        "questions": enrichQuestions([
          "Has the organization determined the interested parties that are relevant to the ISMS",
          "Has the organization determined the needs and expectations of these interested parties",
          "Have the requirements of these interested parties been determined, including legal, regulatory and contractual requirements?"
        ])
      },
      {
        "id": "4.3",
        "title": "4.3 Determining the scope of the information security management system",
        "questions": enrichQuestions([
          "Have the boundaries and applicability of the ISMS been determined to establish its scope, taking into consideration the external and internal issues, the requirements of interested parties and the interfaces and dependencies with other organizations?",
          "Has the organization defined the scope of ISMS including the in scope departments, interfaces, dependences and the locations",
          "Is ISMS scope been documented"
        ])
      },
       {
        "id": "5.1",
        "title": "5.1 Leadership and commitment",
        "questions": enrichQuestions([
          "Is the organization’s leadership commitment to the ISMS demonstrated by establishing the information security policy and objectives, compatible with the strategic direction of the organization, and in promotion of continual improvement?",
          "Has the leadership ensured the integration of the ISMS requirements into its business processes?",
          "Has the leadership ensured resources are available for the ISMS, and directing and supporting individuals, including management, who contribute to its effectiveness?",
          "Has the leadership communicated the importance of effective information security and conformance to ISMS requirements?",
          "Has the leadership directing and supporting relevant roles to contribute to the effectiveness of ISMS"
        ])
      },
      {
        "id": "5.2",
        "title": "5.2 Policy",
        "questions": enrichQuestions([
          "Is there an established information security policy that is appropriate to ISMS",
          "Does the information security policy gives a framework for setting objectives, and demonstrates commitment for continual improvement of ISMS",
          "Is the policy documented and communicated to employees and relevant interested parties?"
        ])
      },
      {
        "id": "5.3",
        "title": "5.3 Organizational roles, responsibilities and authorities",
        "questions": enrichQuestions([
          "Are the roles, responsibilities & authorities relevant to ISMS scope clearly defined and communicated?",
          "Is the Org Chart defined and inline with the defined roles and responsibilities",
          "Are the responsibilities and authorities for conformance and reporting on ISMS performance assigned?"
        ])
      },
       {
        "id": "6.1",
        "title": "6.1 Actions to address risks and opportunities",
        "questions": enrichQuestions([
          "Have the internal and external issues, and the requirements of interested parties been considered to determine the risks and opportunities that need to be addressed to ensure that the ISMS achieves its outcome",
          "Have actions to address risks and opportunities been planned, and integrated into the ISMS processes, and are they evaluated for effectiveness?",
          "Has an information security risk assessment process that establishes the criteria for performing information security risk assessments, including risk acceptance criteria been defined?",
          "Is the information security risk assessment process repeatable and does it produce consistent, valid and comparable results?"
        ])
      },
      {
        "id": "6.1.2",
        "title": "6.1.2 Information security risk assessment",
        "questions": enrichQuestions([
          "Does the information security risk assessment process identify risks associated with loss of confidentiality, integrity and availability for information within the scope of the ISMS, and are risk owners identified?",
          "Are information security risks analysed to assess the realistic likelihood and potential consequences that would result, if they were to occur, and have the levels of risk been determined?",
          "Are information security risks compared to the established risk criteria and prioritised?",
          "Is documented information about the information security risk assessment process available?"
        ])
      },
      {
        "id": "6.1.3",
        "title": "6.1.3 Information security risk treatment",
        "questions": enrichQuestions([
          "Is there an information security risk treatment process to select appropriate risk treatment options for the results of the information security risk assessment, and are controls determined to implement the risk treatment option chosen?",
          "Have the controls determined, been compared with ISO/IEC 27001:2022 Annex A to verify that no necessary controls have been missed?",
          "Has a Statement of Applicability been produced to justify Annex A exclusions, and inclusions together with the control implementation status?",
          "Has the organization formulated an information security risk treatment plan and obtained the risk owners approval for residual risk acceptance"
        ])
      },
      {
        "id": "6.2",
        "title": "6.2 Information security objectives and planning to achieve them",
        "questions": enrichQuestions([
          "Have measurable ISMS objectives and targets been established, documented and communicated throughout the organization?",
          "In setting its objectives, has the organization determined what needs to be done, when and by whom?",
          "Is everyone within the organization’s control aware of the importance of the information security policy, their contribution to the effectiveness of the ISMS and the implications of not conforming?",
          "Has the organization determined the need for internal and external communications relevant to the ISMS, including what to communicate, when, with whom, and who by, and the processes by which this is achieved?"
        ])
      },
      {
        "id": "7.1",
        "title": "7.1 Resources",
        "questions": enrichQuestions([
          "Has the organization determined the resources needed for ISMS"
        ])
      },
      {
        "id": "7.2",
        "title": "7.2 Competence",
        "questions": enrichQuestions([
          "Has the organization determined the competency of the persons relevant to ISMS",
          "Has the organization taken corrective measures to acquire the necessary competency of the persons relevant to ISMS",
          "Has the organization retained information as evidence for showcasing that the persons relevant to ISMS have necessary competency"
        ])
      },
      {
        "id": "7.3",
        "title": "7.3 Awareness",
        "questions": enrichQuestions([
          "Has the organization defined and documented Information Security Awareness Plan",
          "Does the employees undergo security awareness sessions upon hire and on periodic basis",
          "Does the organization have a method to evaluate the effectiveness of the awareness training",
          "How does the organization ensures that the employees are aware about the information security policy",
          "Are the employees aware of the implications of not confirming to information security requirements"
        ])
      },
      {
        "id": "7.4",
        "title": "7.4 Communication",
        "questions": enrichQuestions([
          "Has the organization developed internal and external communication plan",
          "Does the communication plan include the details of what to share, when to share, whom to share, how to share and with whom to share"
        ])
      },
      {
        "id": "7.5",
        "title": "7.5 Documented Information (7.5.1, 7.5.2, 7.5.3)",
        "questions": enrichQuestions([
          "Has the organization determined the documented information necessary for the effectiveness of the ISMS?",
          "Is the documented information in the appropriate format, and has it been identified, reviewed and approved for suitability?",
          "Has the organization defined naming conventions including (document tittle, date, author & approval)",
          "While creating and updating the documents does the organization ensure the integrity of the documents by capturing version numbers and appropriate approvals",
          "Does the organization have a process to control the distribution of its documented information to ensure it is only available for intended persons",
          "Does the organization protects the documented information from loss of confidentiality, integrity and availability",
          "Is the documented information properly stored and adequately preserved for its legibility",
          "Has the organization identified and documentation of external origin"
        ])
      },
      {
        "id": "8.1",
        "title": "8.1 Operational planning and control",
        "questions": enrichQuestions([
          "Does the organization has a programme to ensure that the ISMS achieves its outcomes, requirements and objectives been developed and implemented?",
          "Is documented evidence retained to demonstrate that processes have been carried out as planned?",
          "Are changes planned and controlled, and unintended changes reviewed to mitigate any adverse results?",
          "How does the organization control outsourced processes/services relevant to ISMS",
          "Does the organization have documented information as an evidence to ensure that the processes are carried out and implemented as planned."
        ])
      },
      {
        "id": "8.2",
        "title": "8.2 Information security risk assessment",
        "questions": enrichQuestions([
          "Are information security risk assessments performed at planned intervals or when significant changes occur, and is documented information retained?",
          "Does the organization retain relevant documented information of the results of the information security risk assessments"
        ])
      },
      {
        "id": "8.3",
        "title": "8.3 Information security risk treatment",
        "questions": enrichQuestions([
          "Has the information security risk treatment plan been implemented as per the information risk treatment plan",
          "Does the organization retain relevant documented information of the results of the information security risk treatment"
        ])
      },
      {
        "id": "9.1",
        "title": "9.1 Monitoring, measurement, analysis and evaluation",
        "questions": enrichQuestions([
          "Is the information security performance and effectiveness of the ISMS evaluated?",
          "How does the organization determine the processes and controls that needs to be monitored and controlled",
          "How does the organization determine the methods for monitoring, measurement, analysis and evaluation of security processes and controls",
          "How does the organization ensure that the selected methods produce comparable, repeatable and reproducible results",
          "Has the organization determined the frequency for monitoring, measurement, analysis and evaluation of security processes and controls",
          "Has the organization determined when to analyze the results of monitoring, measurement, analysis and evaluation of security processes and controls",
          "Has the organization determined what needs to be monitored and measured, when, and by whom",
          "Is documented information retained as evidence of the results of monitoring and measurement?"
        ])
      },
      {
        "id": "9.2",
        "title": "9.2 Internal audit",
        "questions": enrichQuestions([
          "Does the organization plan, establish, implement and maintain an internal audit program",
          "Has the organization defined the frequency of internal audits",
          "Has the organization defined the objective and criteria for the internal audit",
          "Has the organization defined the frequency, methods, responsibilities and requirements for the audit program",
          "Are internal audits conducted periodically to check that the ISMS is effective and conforms to both ISO/IEC 27001:2022 and the organization’s requirements?",
          "Does the audit program take into consideration of importance of the process during the audit",
          "Are the audits performed by competent personnel",
          "How does the organization ensure objectivity and impartiality of the audit",
          "Are the results of the internal audit reported to relevant management personnel",
          "Are results of audits reported to management, and is documented information about the audit programme and audit results retained?"
        ])
      },
      {
        "id": "9.3",
        "title": "9.3 Management review",
        "questions": enrichQuestions([
          "Does the review consider results from previous management reviews",
          "Does the Top Management review the effectiveness of ISMS at planned intervals",
          "Does the review consider changes to the internal and external issues",
          "Does the review consider changes to the needs and expectations of interested parties",
          "Does the review consider the non conformities and corrective actions",
          "Does the review consider monitoring and measurement results",
          "Does the review consider audit results",
          "Does the review consider feedback from interested parties",
          "Does the review consider results of risk assessment and risk treatment",
          "Does the review consider opportunities for continual improvement",
          "Does the outputs of the review include decisions related to continual improvement and any needs for changes to ISMS",
          "Has the organization retained documented information as evidence for the results of management reviews",
          "Are the results of the management review documented, acted upon and communicated to interested parties as appropriate?"
        ])
      },
      {
        "id": "10.1",
        "title": "10.1 Continual improvement",
        "questions": enrichQuestions([
          "Does the organization continually improve the suitability, adequacy and effectiveness of the ISMS"
        ])
      },
      {
        "id": "10.2",
        "title": "10.2 Nonconformity and corrective action",
        "questions": enrichQuestions([
          "What are the steps taken by the organization on the non conformities identified",
          "Does the organization takes actions to control and correct the non conformities",
          "Does the organization identifies the root cause for the non conformity",
          "Does the organization take steps to eliminate the root cause",
          "Does the organization take steps to identify similar non conformities within the organization.",
          "Does the Organization take steps to review the effectiveness of corrective actions taken'",
          "Is documented information retained as evidence of the nature of non-conformities, actions taken and the results?"
        ])
      }
    ]
  },
  {
    "id": "a.5",
    "title": "A.5 - Organizational Controls",
    "description": "Define the organization's governance, policies, and processes to manage information security systematically.",
    "color": "green",
    "icon": ShieldIcon,
    "subSections": [
      {
        "id": "A.5.1",
        "title": "5.1 Policies for information security",
        "description": "Information security policy and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel and relevant interested parties, and reviewed at planned intervals and if significant changes occur.",
        "questions": enrichQuestions([
          "Do Security policies exist.",
          "Are all policies approved by management.",
          "Are policies properly communicated to employees.",
          "Are security policies subject to review.",
          "Are the reviews conducted at regular intervals.",
          "Are reviews conducted when circumstances change."
        ])
      },
      {
        "id": "A.5.2",
        "title": "5.2 Information security roles and responsibilities",
        "description": "Information security roles and responsibilities shall be defined and allocated according to the organization needs.",
        "questions": enrichQuestions([
          "Are the employees properly briefed on their information security roles and responsibilities prior to being granted access to the organization’s information and other associated assets.",
          "Are responsibilities for the protection of individual assets and Responsibilities for information security risk management activities and in particular for acceptance of residual risks should be defined."
        ])
      },
       {
        "id": "A.5.3",
        "title": "5.3 Segregation of duties",
        "description": "Conflicting duties and conflicting areas of responsibility shall be segregated.",
        "questions": enrichQuestions([
          "Are duties and areas of responsibility separated, in order to reduce opportunities for unauthorized modification or misuse of information, or services."
        ])
      },
      {
        "id": "A.5.4",
        "title": "5.4 Management responsibilities",
        "description": "Management shall require all personnel to apply information security in accordance with the established information security policy, topic-specific policies and procedures of the organization.",
        "questions": enrichQuestions([
          "Does the management demonstrate support of the information security policy, topic-specific policies, procedures and information security controls.",
          "Does the management ensures that personnel achieve a level of awareness of information security relevant to their roles and responsibilities within the organization.",
          "Does the management ensures that personnel are provided with adequate resources and project planning time for implementing the organization’s security-related processes and controls."
        ])
      },
      {
        "id": "A.5.5",
        "title": "5.5 Contact with authorities",
        "description": "The organization shall establish and maintain contact with relevant authorities.",
        "questions": enrichQuestions([
          "Is there a procedure documenting when, and by whom, contact with relevant authorities (law enforcement etc.) will be made.",
          "Is there a process, which details how and when contact, is required?",
          "Is there a process for routine contact and intelligence sharing."
        ])
      },
      {
        "id": "A.5.6",
        "title": "5.6 Contact with special interest groups",
        "description": "The organization shall establish and maintain contact with special interest groups or other specialist security forums and professional associations.",
        "questions": enrichQuestions([
          "Do relevant individuals within the organisation maintain active membership in relevant special interest groups.",
          "Does relevant individuals within the organization gain knowledge about best practices and stay up to date with relevant security information.",
          "Does relevant individuals within the organization share and exchange information about new technologies, products, services, threats or vulnerabilities."
        ])
      },
      {
        "id": "A.5.7",
        "title": "5.7 Threat intelligence",
        "description": "Information relating to information security threats shall be collected and analyzed to produce threat intelligence.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process for collecting, analyzing and evaluating information related to information security threats.",
          "Does the threat intelligence program ensure that the information collected related to information security threats are relevant, insightful, contextual and actionable.",
          "Does the threat intelligence program has a formal process for identifying, vetting and selecting internal and external information security threat sources and analyzing information to understand the impact to the organization."
        ])
      },
      {
        "id": "A.5.8",
        "title": "5.8 Information security in project management",
        "description": "Information security shall be integrated into project management.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to ensure information security risks related to projects and deliverables are effectively addressed in project management throughout the project life cycle.",
          "Are the information security risks assessed and treated at an early stage and periodically as part of project risks throughout the project life cycle.",
          "Are the requirements regards to compliance with the legal, statutory, regulatory and contractual requirements considered throughout the project management life cycle?"
        ])
      },
      {
        "id": "A.5.9",
        "title": "5.9 Inventory of information and other associated assets",
        "description": "An inventory of information and other associated assets, including owners, shall be developed and maintained.",
        "questions": enrichQuestions([
          "Is there an inventory of all assets associated with information and information processing facilities.",
          "Is the inventory accurate and kept up to date.",
          "Are the asset owners identified and tagged to all assets.",
          "Is the asset inventory updated when assets are procured, decommissioned or disposed."
        ])
      },
      {
        "id": "A.5.10",
        "title": "5.10 Acceptable use of information and other associated assets",
        "description": "Rules for the acceptable use and procedures for handling information and other associated assets shall be identified, documented and implemented.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to ensure information and other associated assets are appropriately protected, used and handled.",
          "Is the policy approved by the management.",
          "Is the policy communicated to all individuals of the organization.",
          "Does the policy at minimum covers expected and unacceptable behaviors of employees from an information security perspective."
        ])
      },
      {
        "id": "A.5.11",
        "title": "5.11 Return of assets",
        "description": "Personnel and other interested parties as appropriate shall return all the organization’s assets in their possession upon change or termination of their employment, contract or agreement.",
        "questions": enrichQuestions([
          "Is there a process in place to ensure all employees and external users return the organisation's assets on termination of their employment, contract or agreement.",
          "Is the organization following the defined process for collecting all physical and electronic assets provided to the employee."
        ])
      },
      {
        "id": "A.5.12",
        "title": "5.12 Classification of information",
        "description": "Information shall be classified according to the information security needs of the organization based on confidentiality, integrity, availability and relevant interested party requirements.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to classify information and assets based on the criticality and sensitivity of the information.",
          "Are the requirements for confidentiality, integrity and availability considered for the classification.",
          "Is the classification scheme defined and followed for information classification.",
          "Are the information owners involved in classifying the information under their control.",
          "Is there a defined process for declassifying or to change the classification of the information.",
          "Is the information classification reviewed on periodic basis."
        ])
      },
      {
        "id": "A.5.13",
        "title": "5.13 Labelling of information",
        "description": "An appropriate set of procedures for information labelling shall be developed and implemented in accordance with the information classification scheme adopted by the organization.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to label the information within the organization.",
          "Does the labelling process defined the contents to be included in the label."
        ])
      },
      {
        "id": "A.5.14",
        "title": "5.14 Information transfer",
        "description": "Information transfer rules, procedures, or agreements shall be in place for all types of transfer facilities within the organization and between the organization and other parties.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to maintain the security of information transferred within an organization and with any external interested parties.",
          "Are procedures for how data should be transferred made available to all employees.",
          "Are relevant technical controls in place to prevent non-authorised forms of data transfer",
          "Is there a documented policy and process detailing how physical media should be transported.",
          "Is media in transport protected against unauthorised access, misuse or corruption."
        ])
      },
      {
        "id": "A.5.15",
        "title": "5.15 Access control",
        "description": "Rules to control physical and logical access to information and other associated assets shall be established and implemented based on business and information security requirements.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to manage logical and physical access to information, assets and information processing assets.",
          "Is the policy based on business requirements.",
          "Is the policy communicated appropriately.",
          "Does the access management include the principles of 'need-to-know' and 'need-to-use' for managing logical and physical access to information, assets and information processing facilities."
        ])
      },
      {
        "id": "A.5.16",
        "title": "5.16 Identity management",
        "description": "The full life cycle of identities shall be managed.",
        "questions": enrichQuestions([
          "Are the employees provided with unique IDs for accessing information, assets and information processing facilities.",
          "Shared user IDs/Accounts are only authorized when necessary for business purposes and after approvals",
          "Are the Identities removed/disabled when no longer needed."
        ])
      },
      {
        "id": "A.5.17",
        "title": "5.17 Authentication information",
        "description": "Allocation and management of authentication information shall be controlled by a management process, including advising personnel on appropriate handling of authentication information.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to distribute or assign authentication credentials for employees.",
          "Is there a documented policy/procedure describing the baseline requirements of authentication credentials(passwords/passphrases/PINs) used for accessing organization information, assets and information processing facilities.",
          "Are the passwords/authentication credentials communicated to employees via a secured channel.",
          "Are the employees prompted to change the credentials upon first login.",
          "Is there a formal process for resetting authentication credentials."
        ])
      },
      {
        "id": "A.5.18",
        "title": "5.18 Access rights",
        "description": "Access rights to information and other associated assets shall be provisioned, reviewed, modified and removed in accordance with the organization’s topic-specific policy on and rules for access control.",
        "questions": enrichQuestions([
          "Are the assess rights assigned considering the business requirements and individual's roles and responsibilities.",
          "Is the principle of segregation of duties considered while provisioning access rights.",
          "are appropriate approvals taken from asset/information owners for provisioning or revoking access rights.",
          "Is there a predefined frequency for reviewing the access rights.",
          "Are the access rights modified upon change of job role or termination."
        ])
      },
      {
        "id": "A.5.19",
        "title": "5.19 Information security in supplier relationships",
        "description": "Processes and procedures shall be defined and implemented to manage the information security risks associated with the use of supplier’s products or services.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to manage information security risks associated with the use of supplier’s products or services.",
          "Are the vendors/suppliers evaluated with the organization's requirements for information security.",
          "Are the process defined for handling incidents and contingencies associated with supplier products and services.",
          "Are suppliers/vendors provided with documented security requirements?",
          "Is supplier/vendor's access to information assets & infrastructure controlled and monitored?"
        ])
      },
      {
        "id": "A.5.20",
        "title": "5.20 Addressing information security within supplier agreements",
        "description": "Relevant information security requirements shall be established and agreed with each supplier based on the type of supplier relationship.",
        "questions": enrichQuestions([
          "Are the information security requirements included in contracts established with suppliers and service providers?",
          "Does the contracts established with supplier and service providers include legal, statutory, regulatory, data protection, handling of personally identifiable information (PII), intellectual property rights and copyright requirements.",
          "Does the contracts established with supplier and service providers include rules of acceptable use of organization's information and information assets."
        ])
      },
      {
        "id": "A.5.21",
        "title": "5.21 Managing information security in the information and communication technology (ICT) supply chain",
        "description": "Processes and procedures shall be defined and implemented to manage the information security risks associated with the ICT products and services supply chain.",
        "questions": enrichQuestions([
          "Do supplier agreements include requirements to address information security within the service & product supply chain."
        ])
      },
      {
        "id": "A.5.22",
        "title": "5.22 Monitoring, review and change management of supplier services",
        "description": "The organization shall regularly monitor, review, evaluate and manage change in supplier information security practices and service delivery.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to maintain an agreed level of information security and service delivery in line with supplier agreements.",
          "Are the SLA's (Service Level Agreements) defined for all service providers .",
          "Are there any periodic checks done to ensure the supplier is delivering the agreed level of services to the organization."
        ])
      },
      {
        "id": "A.5.23",
        "title": "5.23 Information security for use of cloud services",
        "description": "Processes for acquisition, use, management and exit from cloud services shall be established in accordance with the organization’s information security requirements.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to manage information security for the use of cloud services within the organization.",
          "Are the roles and responsibilities related to the use and management of cloud services defined.",
          "Is there a process defined to o obtain assurance on information security controls implemented by cloud service providers.",
          "Is there a process defined for handling information security incidents that occur in relation to the use of cloud services."
        ])
      },
      {
        "id": "A.5.24",
        "title": "5.24 Information security incident management planning and preparation",
        "description": "The organization shall plan and prepare for managing information security incidents by defining, establishing and communicating information security incident management processes, roles and responsibilities.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process for quick, effective, consistent and orderly response to information security incidents.",
          "Is there a process for reporting of identified information security weaknesses.",
          "Is this process communicated to all employees and interested parties as applicable",
          "Are the members of incident management team provided with appropriate training for managing incidents.",
          "Is the incident response plan tested on periodic basis."
        ])
      },
      {
        "id": "A.5.25",
        "title": "5.25 Assessment and decision on information security events",
        "description": "The organization shall assess information security events and decide if they are to be categorized as information security incidents.",
        "questions": enrichQuestions([
          "Is there a process to ensure information security events are properly assessed and classified.",
          "Is there a process to categorize and prioritise incidents based on the impact."
        ])
      },
      {
        "id": "A.5.26",
        "title": "5.26 Response to information security incidents",
        "description": "Information security incidents shall be responded to in accordance with the documented procedures.",
        "questions": enrichQuestions([
          "Is there a process defined for responding to information security incidents.",
          "Is there documented response timelines for all categories of incidents.",
          "Is there a process to understand and analyse the root cause for the incidents.",
          "Are the actions taken to mitigate the incident effective ."
        ])
      },
      {
        "id": "A.5.27",
        "title": "5.27 Learning from information security incidents",
        "description": "Knowledge gained from information security incidents shall be used to strengthen and improve the information security controls.",
        "questions": enrichQuestions([
          "Is there a process or framework which allows the organisation to learn from information security incidents and reduce the impact / probability of future events.",
          "Is there a process to enhance the incident management plan including incident scenarios and procedures from the learnings."
        ])
      },
      {
        "id": "A.5.28",
        "title": "5.28 Collection of evidence",
        "description": "The organization shall establish and implement procedures for the identification, collection, acquisition and preservation of evidence related to information security events.",
        "questions": enrichQuestions([
          "Is there a process in place to ensure a consistent and effective management of evidence related to information security incidents.",
          "In the event of an information security incident is relevant data collected in a manner which allows it to be used as evidence."
        ])
      },
      {
        "id": "A.5.29",
        "title": "5.29 Information security during disruption",
        "description": "The organization shall plan how to maintain information security at an appropriate level during disruption.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure describing process to protect information and other associated assets during disruption.",
          "Is there a process to maintain existing information security controls during disruption."
        ])
      },
      {
        "id": "A.5.30",
        "title": "5.30 ICT readiness for business continuity",
        "description": "ICT readiness shall be planned, implemented, maintained and tested based on business continuity objectives and ICT continuity requirements.",
        "questions": enrichQuestions([
          "Is there a documented policy/procedure to ensure the availability of the organization’s information and other associated assets during disruption.",
          "Is information security included in the organisation's continuity plans.",
          "Do information processing facilities have sufficient redundancy to meet the organisations availability requirements.",
          "Does the organization test its continuity plan on a periodic basis."
        ])
      },
      {
        "id": "A.5.31",
        "title": "5.31 Legal, statutory, regulatory and contractual requirements",
        "description": "Legal, statutory, regulatory and contractual requirements relevant to information security and the organization’s approach to meet these requirements shall be identified, documented and kept up to date.",
        "questions": enrichQuestions([
          "Is there a process in place to ensure compliance with legal, statutory, regulatory and contractual requirements related to information security.",
          "Are the responsibilities assigned to individuals for managing legal, statutory, regulatory and contractual requirements related to information security.",
          "Are the actions taken to meet legal, statutory, regulatory and contractual requirements related to information security reviewed to check their effectiveness."
        ])
      },
      {
        "id": "A.5.32",
        "title": "5.32 Intellectual property rights",
        "description": "The organization shall implement appropriate procedures to protect intellectual property rights.",
        "questions": enrichQuestions([
          "Does the organisation keep a record of all intellectual property rights and use of proprietary software products.",
          "Does the organisation monitor for the use of unlicensed software.",
          "Are processes in place for acquiring software only through known and reputable sources, to ensure that copyright is not violated.",
          "Are processes in place to ensure that any maximum number of users permitted within the license is not exceeded."
        ])
      },
      {
        "id": "A.5.33",
        "title": "5.33 Protection of records",
        "description": "Records shall be protected from loss, destruction, falsification, unauthorized access and unauthorized release.",
        "questions": enrichQuestions([
          "Are records protected from loss, destruction, falsification and unauthorized access or release in accordance with legislative, regulatory, contractual and business requirements.",
          "Are controls on place for storage, handling chain of custody and disposal of records."
        ])
      },
      {
        "id": "A.5.34",
        "title": "5.34 Privacy and protection of personal identifiable information (PII)",
        "description": "The organization shall identify and meet the requirements regarding the preservation of privacy and protection of PII according to applicable laws and regulations and contractual requirements.",
        "questions": enrichQuestions([
          "Is there a process in place to ensure compliance with legal, statutory, regulatory and contractual requirements related to the information security aspects of the protection of PII.",
          "Is the process communicated to all relevant interested parties involved in the processing of personally identifiable information."
        ])
      },
      {
        "id": "A.5.35",
        "title": "5.35 Independent review of information security",
        "description": "The organization’s approach to managing information security and its implementation including people, processes and technologies shall be reviewed independently at planned intervals, or when significant changes occur.",
        "questions": enrichQuestions([
          "Is there a process in place to ensure the continuing suitability, adequacy and effectiveness of the organization’s approach to managing information security.",
          "Is the organisations approach to managing information security subject to regular independent review?",
          "Is the implementation of security controls subject to regular independent review."
        ])
      },
      {
        "id": "A.5.36",
        "title": "5.36 Compliance with policies, rules and standards for information security",
        "description": "Compliance with the organization’s information security policy, topic-specific policies, rules and standards shall be regularly reviewed.",
        "questions": enrichQuestions([
          "Is there a process in place to ensure that information security is implemented and operated in accordance with the organization’s information security policy, topic-specific policies, rules and standards.",
          "If a non compliance is identified is there a process to identify the causes of the non-compliance, implementing corrective actions and reviewing the actions taken to evaluate the effectiveness."
        ])
      },
      {
        "id": "A.5.37",
        "title": "5.37 Documented operating procedures",
        "description": "Operating procedures for information processing facilities shall be documented and made available to personnel who need them.",
        "questions": enrichQuestions([
          "Are operating procedures well documented.",
          "Are the procedures made available to all users who need them.",
          "Does the operating procedures specify responsibilities of individuals."
        ])
      }
    ]
  },
  {
    "id": "a.6",
    "title": "People Controls (A.6)",
    "description": "Ensure that employees and contractors understand and fulfill their information security responsibilities.",
    "color": "red",
    "icon": UsersIcon,
    "subSections": [
      {
        "id": "A.6.1",
        "title": "6.1 Screening",
        "description": "Background verification checks on all candidates to become personnel shall be carried out prior to joining the organization and on an ongoing basis taking into consideration applicable laws, regulations and ethics and be proportional to the business requirements, the classification of the information to be accessed and the perceived risks.",
        "questions": enrichQuestions([
          "Is there a screening process for onboarding full-time, part-time and temporary staff.",
          "Are background verification checks carried out on all new candidates for employment?",
          "Does the background verification process consider checking professional experience, academic qualifications, independent identity verification, criminal records verification and credit review.",
          "Are the checks compliant with relevant laws, regulations and ethics?"
        ])
      },
      {
        "id": "A.6.2",
        "title": "6.2 Terms and conditions of employment",
        "description": "The employment contractual agreements shall state the personnel’s and the organization’s responsibilities for information security.",
        "questions": enrichQuestions([
          "Is there a formal terms and conditions of employment documented and communicated to all full-time, part-time and temporary staff before onboarding.",
          "Does the terms and conditions of employment include organization’s information security policy and relevant topic-specific policies.",
          "Does the terms and conditions of employment include legal responsibilities and rights like copyright laws or data protection legislations.",
          "Does the terms and conditions of employment include responsibilities for the handling of information received from interested parties.",
          "Does the terms and conditions of employment include actions to be taken if personnel disregard the organization’s security requirements."
        ])
      },
      {
        "id": "A.6.3",
        "title": "6.3 Information security awareness, education and training",
        "description": "Personnel of the organization and relevant interested parties shall receive appropriate information security awareness, education and training and regular updates of the organization's information security policy, topic-specific policies and procedures, as relevant for their job function.",
        "questions": enrichQuestions([
          "Do all employees, contractors and 3rd party users undergo regular security awareness training appropriate to their role and function within the organisation.",
          "Does the Information security awareness program cover information security policy and topic-specific policies, standards, laws, statutes, regulations, contracts and agreements.",
          "Does the Information security awareness program cover personal accountability for one’s own actions and inactions, and general responsibilities towards securing or protecting information belonging to the organization and interested parties.",
          "Does the organization have a formal process to access the effectiveness of the information security awareness program by ensuring that all employees take up quiz."
        ])
      },
      {
        "id": "A.6.4",
        "title": "6.4 Disciplinary process",
        "description": "A disciplinary process shall be formalized and communicated to take actions against personnel and other relevant interested parties who have committed an information security policy violation.",
        "questions": enrichQuestions([
          "Is there a formal disciplinary process which allows the organisation to take action against employees who have committed an information security breach.",
          "Is the formal disciplinary process approved by the top management.",
          "Is the formal disciplinary process communicated to all employees.",
          "Does the formal disciplinary process take into consideration factors such as: whether or not the violator was properly trained, the nature and gravity of the breach, whether it was intentional, and if it's a repeated offence."
        ])
      },
      {
        "id": "A.6.5",
        "title": "6.5 Responsibilities after termination or change of employment",
        "description": "Information security responsibilities and duties that remain valid after termination or change of employment shall be defined, enforced and communicated to relevant personnel and other interested parties.",
        "questions": enrichQuestions([
          "Does the employee termination process define the information security responsibilities and duties that shall remain valid after termination or change of job roles for all full-time, part-time, and temporary staff.",
          "Are the responsibilities and duties that remain valid after termination of employment or contract included in the individual’s terms and conditions of employment, contract or agreement."
        ])
      },
      {
        "id": "A.6.6",
        "title": "6.6 Confidentiality or non-disclosure agreements",
        "description": "Confidentiality or non-disclosure agreements reflecting the organization’s needs for the protection of information should be identified, documented, regularly reviewed and signed by personnel and other relevant interested parties.",
        "questions": enrichQuestions([
          "Are the full-time, part-time and temporary staff required to sign confidentiality or non-disclosure agreements prior to being given access to organization's confidential information and other associated assets.",
          "Does the confidentiality or non-disclosure agreements include: definition of protected information, agreement validity, ownership of information, and terms for information return or destruction."
        ])
      },
      {
        "id": "A.6.7",
        "title": "6.7 Remote working",
        "description": "Security measures shall be implemented when personnel are working remotely to protect information accessed, processed or stored outside the organization’s premises.",
        "questions": enrichQuestions([
          "Is there a formal policy covering the information security requirements for allowing personnel to work and access organization's information remotely.",
          "Is the remote working policy approved by the top management.",
          "Is the remote working policy communicated to all full-time, part-time and temporary staff who work remotely.",
          "Does the remote working policy consider physical security requirements.",
          "Does the remote working policy consider the communications security requirements.",
          "Does the remote working policy consider the threat of unauthorized access to information or resources from other persons in public places.",
          "Does the remote working policy consider use of security measures, such as firewalls and protection against malware."
        ])
      },
      {
        "id": "A.6.8",
        "title": "6.8 Information security event reporting",
        "description": "The organization shall provide a mechanism for personnel to report observed or suspected information security events through appropriate channels in a timely manner.",
        "questions": enrichQuestions([
          "Are all full-time, part-time, and temporary staff made aware of their responsibility to report information security events.",
          "Are all full-time, part-time, and temporary staff made aware of the procedure for reporting information security.",
          "Are all full-time, part-time and temporary staff made aware of the communication contact details and communication medium for reporting information security events."
        ])
      }
    ]
  },
  {
    "id": "a.7",
    "title": "Physical Controls (A.7)",
    "description": "Secure physical areas, protect equipment from threats, and manage assets to prevent unauthorized access or damage.",
    "color": "purple",
    "icon": OperationIcon,
    "subSections": [
      {
        "id": "A.7.1",
        "title": "7.1 Physical security perimeters",
        "description": "Security perimeters shall be defined and used to protect areas that contain information and other associated assets.",
        "questions": enrichQuestions([
          "Is there a designated security perimeter.",
          "Are sensitive or critical information areas segregated and appropriately controlled.",
          "Has the organization implemented physically sound perimeters for a building or site containing information processing facilities."
        ])
      },
      {
        "id": "A.7.2",
        "title": "7.2 Physical entry",
        "description": "Secure areas should be protected by appropriate entry controls and access points.",
        "questions": enrichQuestions([
          "Has the organization established a formal process for the management of access rights to physical areas.",
          "Does the process include the provisioning, periodical review, update and revocation of authorizations for physical access.",
          "is there a process for maintaining and monitoring a physical logbook or electronic audit trail of all physical access.",
          "Are adequate authentication mechanisms like access cards, biometrics or two-factor authentication implemented for physical access to information processing facilities.",
          "Is there a formal process for managing access to visitors.",
          "Are the visitors given a Visitor Badge which distinguishes them from the employees.",
          "Are the visitor logs maintained including the date, time in, time out, purpose of visit and personnel authorising the visitor’s entry.",
          "Are the visitors verified for their identity by checking the National ID or their company ID.",
          "Are the visitors accompanied by organization's personal and escorted to all places within the organization.",
          "Are the internal and external doors of delivery and loading are adequately secured.",
          "Are the incoming deliveries inspected and examined for explosives, chemicals or other hazardous materials before they are moved from delivery and loading areas.",
          "Are the incoming deliveries registered in accordance with asset management procedures.",
          "Are the incoming deliveries inspected for tampering or meddling."
        ])
      },
      {
        "id": "A.7.3",
        "title": "7.3 Securing offices, rooms and facilities",
        "description": "Physical security for offices, rooms and facilities shall be designed and implemented.",
        "questions": enrichQuestions([
          "Are the offices, rooms and critical information processing facilities sited to prevent unauthorised access.",
          "Are controls implemented for critical process facilities to prevent confidential information or activities from being visible and audible from the outside."
        ])
      },
      {
        "id": "A.7.4",
        "title": "7.4 Physical security monitoring",
        "description": "Premises should be continuously monitored for unauthorized physical access.",
        "questions": enrichQuestions([
          "Are the organization's physical premises monitored by surveillance systems, security guards, or intruder alarms.",
          "Are the entry and exit points of critical information processing facilities equipped with video monitoring systems.",
          "Is the access to video monitoring/CCTV systems restricted to authorized personnel.",
          "Is the video monitoring/CCTV footage retained as per organizations and legal requirements."
        ])
      },
      {
        "id": "A.7.5",
        "title": "7.5 Protecting against physical and environmental threats",
        "description": "Protection against physical and environmental threats, such as natural disasters and other intentional or unintentional physical threats to infrastructure should be designed and implemented.",
        "questions": enrichQuestions([
          "Are the critical information processing facilities protected against physical and environmental threats.",
          "Are adequate controls implemented to protect personnel and assets against fire, flooding, electrical surging, lightning, explosives etc."
        ])
      },
      {
        "id": "A.7.6",
        "title": "7.6 Working in secure areas",
        "description": "To protect information and other associated assets in secure areas from damage and unauthorized interference by personnel working in these areas.",
        "questions": enrichQuestions([
          "Are the personnel aware of the existence of the secure areas.",
          "Activities within secure areas communicated only to authorised personnel on need-to-know basis.",
          "Are the secure areas periodically inspected to identify any vacant areas.",
          "Are controls in place to restrict photographic, video, audio or other recording equipment, such as cameras in user endpoint devices, unless authorized within secure areas."
        ])
      },
      {
        "id": "A.7.7",
        "title": "7.7 Clear desk and clear screen",
        "description": "Clear desk rules for papers and removable storage media and clear screen rules for information processing facilities shall be defined and appropriately enforced.",
        "questions": enrichQuestions([
          "has the organization defined a formal clear desk and clear screen policy.",
          "Is the clear desk and clear screen policy approved by the top management.",
          "Is the clear desk and clear screen policy communicated to all full-time, part-time and temporary staff.",
          "Does the policy include requirements for protecting user endpoint devices by key locks or other security means when not in use or unattended.",
          "Does the policy include requirements for configuring user endpoint devices with a secure screen saver after certain period of inactivity.",
          "Does the policy include requirements for the use of printers with an authentication function.",
          "Does the policy include requirements for securely storing documents and removable storage media containing sensitive information.",
          "Does the policy include requirements for clearing sensitive or critical information on whiteboards and other types of display when no longer required."
        ])
      },
      {
        "id": "A.7.8",
        "title": "7.8 Equipment siting and protection",
        "description": "Equipment shall be sited securely and protected.",
        "questions": enrichQuestions([
          "Are the equipments handling sensitive data situated adequately to reduce the risk of information being viewed by unauthorized persons during their use.",
          "Are the equipments situated adequately to protect against physical and environmental threats.",
          "Has the organization established guidelines for eating, drinking, and smoking in proximity to information processing facilities.",
          "Are controls in place for monitoring environmental conditions, such as temperature and humidity of the surroundings."
        ])
      },
      {
        "id": "A.7.9",
        "title": "7.9 Security of assets off-premises",
        "description": "Off-site assets shall be protected.",
        "questions": enrichQuestions([
          "Has the organization defined a formal process for the protection of devices which store or process information outside the organization’s premises.",
          "Are the personnel made aware of guidelines for handling organization's assets off-premises.",
          "Are logs maintained for tracking equipments taken outside the organization.",
          "Are controls implemented to track location of the assets and remote wiping of devices."
        ])
      },
      {
        "id": "A.7.10",
        "title": "7.10 Storage media",
        "description": "Storage media shall be managed through their life cycle of acquisition, use, transportation and disposal in accordance with the organization’s classification scheme and handling requirements.",
        "questions": enrichQuestions([
          "Has the organization defined a formal process for managing removable storage media.",
          "Is the removable media policy approved by the top management.",
          "Is the removable media policy communicated to all full-time, part-time and temporary staff.",
          "Does the removable storage media policy consider requirements for restricting the use of removable storage media only to authorised personnel on need to have basis.",
          "Does the removable storage media policy consider requirements for managing an inventory of removable storage media.",
          "Does the removable storage media policy consider requirements for maintaining audit logs for taking removable storage media outside the organization.",
          "Does the removable storage media policy consider requirements for storing the removable storage media with adequate protection.",
          "Does the removable storage media policy consider requirements for using cryptographic techniques for securing/protecting data within removable storage media.",
          "Does the removable storage media policy consider requirements for enabling USB or SD card slots only on system with need to have basis."
        ])
      },
      {
        "id": "A.7.11",
        "title": "7.11 Supporting utilities",
        "description": "Information processing facilities should be protected from power failures and other disruptions caused by failures in supporting utilities.",
        "questions": enrichQuestions([
          "Are the equipments supporting the utilities is configured, operated and maintained in accordance with the relevant manufacturer’s specifications.",
          "Is there a process to manage the capacity requirements of supporting utilities.",
          "Are the equipments supporting the utilities is inspected and tested regularly to ensure their proper functioning.",
          "Are the emergency switches and valves to cut off power, water, gas or other utilities implemented.",
          "Does the organization have adequate emergency lighting and communications."
        ])
      },
      {
        "id": "A.7.12",
        "title": "7.12 Cabling security",
        "description": "Cables carrying power, data or supporting information services should be protected from interception, interference, or damage.",
        "questions": enrichQuestions([
          "Are the power and telecommunications lines into information processing facilities fed underground wherever possible or equipped with adequate protection like floor cable protector or utility poles.",
          "Are the power and telecommunication cables separated to prevent interference.",
          "Are the cables labelled at each end with sufficient source and destination details to enable the physical identification and inspection of the cable."
        ])
      },
      {
        "id": "A.7.13",
        "title": "7.13 Equipment maintenance",
        "description": "Equipment should be maintained correctly to ensure availability, integrity and confidentiality of information.",
        "questions": enrichQuestions([
          "Are the equipments maintained in accordance with the supplier’s recommended service frequency and specifications.",
          "Does the organization ensure only authorized maintenance personnel carrying out repairs and maintenance on equipment.",
          "Is there a process to supervise maintenance personnel when carrying out maintenance on site.",
          "Is there a process for authorizing and controlling access for remote maintenance.",
          "Is there a process for inspecting the equipments before putting the back into operation after maintenance, to ensure that the equipment has not been tampered with and is functioning properly."
        ])
      },
      {
        "id": "A.7.14",
        "title": "7.14 Secure disposal or re-use of equipment",
        "description": "Items of equipment containing storage media should be verified to ensure that any sensitive data and licensed software has been removed or securely overwritten prior to disposal or re-use.",
        "questions": enrichQuestions([
          "Has the organization defined a formal process for secure disposal and reuse of equipments/assets.",
          "Does the organization ensure to physically destroy or erase the data in storage devices before disposal.",
          "Does the organization ensure to remove labels and markings identifying the organization or indicating the classification, owner, system or network before disposal."
        ])
      }
    ]
  },
  {
    "id": "a.8",
    "title": "Technological Controls (A.8)",
    "description": "Implement and manage technical security measures for systems, networks, and applications.",
    "color": "teal",
    "icon": CodeIcon,
    "subSections": [
      {
        "id": "A.8.1",
        "title": "8.1 User end point devices",
        "description": "Information stored on, processed by or accessible via user end point devices shall be protected",
        "questions": enrichQuestions([
          "Whether a mobile device policy exists and is approved?",
          "Inventory details of the mobile devices registered",
          "Whether policy document address additional risk of using mobile devices (eg.Theft of devices, use of open Wi-Fi hotspots?",
          "Whether organisation have access control and malware protection in place for mobile devices?",
          "Does organisation take regular backup of mobile devices?",
          "Is there a process for registration of user endpoint devices?",
          "Is there any restriction of software installation on user endpoint devices?",
          "Is there any remote disabling, deletion or lockout controls implemented on user endpoint devices?",
          "Are the USB ports disabled on user endpoint devices?"
        ])
      },
      {
        "id": "A.8.2",
        "title": "8.2 Privileged access rights",
        "description": "The allocation and use of privileged access rights shall be restricted and managed",
        "questions": enrichQuestions([
          "What are the criteria that your organisation has planned for a user to be assigned access privileges?",
          "How your authorise and record access privileges and maintain them?",
          "Whether there is an access control policy?",
          "How organisation notify their employees about their assigned privileged access?",
          "Procedure in place for preventing unauthorised use of generic ID",
          "Whether organisation defined the conditions of expiry for privilege access?",
          "Is there a process to review the privilege access rights assigned to users?",
          "How often are the access review performed?"
        ])
      },
      {
        "id": "A.8.3",
        "title": "8.3 Information access restriction",
        "description": "Access to information and other associated assets shall be restricted in accordance with the established topic-specific policy on access control.",
        "questions": enrichQuestions([
          "Do you ensure that sensitive information is kept confidential, and no unauthorised identities have access to that information?",
          "Whether organisation has a defined, maintained and controlled what data can be accessed by whom?",
          "Does the organisation control which identified will have which access (Read,write,delete,execute)",
          "Wheteher the organisation provide physical/logical access control for isolating sensitive systems, application and data?"
        ])
      },
      {
        "id": "A.8.4",
        "title": "8.4 Access to source code",
        "description": "Read and write access to source code, development tools and software libraries shall be appropriately managed",
        "questions": enrichQuestions([
          "Whether the organisation manages the access to program source code and its libraries according to established procedures.",
          "Whether granting and revoking of read/ write access is on need basis?",
          "Does your organisation assure that the developers have source code access only through developer tools which has proper authorisation?",
          "Does you organisation maintain the audit log of all accesses and all changes done to source code?"
        ])
      },
      {
        "id": "A.8.5",
        "title": "8.5 Secure authentication",
        "description": "Secure authentication technologies and procedures shall be implemented based on information access restrictions and the topic-specific policy on access control",
        "questions": enrichQuestions([
          "Does your organisation test that no confidential information is displayed before log on process has successfully completed?",
          "Whether your organisation display generic notices /warnings that systems should be accessed by authorised users only?",
          "Whether there is a defined limit on unsuccessful login attempts?",
          "Whether a procedure defined for raising a security issue?",
          "whether passwords are masked?",
          "Whether the passwords are encrypted before transmission?",
          "Whether a session time out is in place to logout the inactive sessions?",
          "Are the users mandated to change passwords upon first login?",
          "Are the default vendor accounts and passwords changed?"
        ])
      },
      {
        "id": "A.8.6",
        "title": "8.6 Capacity management",
        "description": "The use of resources shall be monitored and adjusted in line with current and expected capacity requirement",
        "questions": enrichQuestions([
          "Is there a process to manage capacity requirements of all systems based on the business process and criticality of the process.",
          "Is there a process to identify expected capacity requirements for the future.",
          "Are there any detective controls implemented to indicate problems and notify administrators.",
          "Whether the organisation follows the retention practises and remove absolute data?"
        ])
      },
      {
        "id": "A.8.7",
        "title": "8.7 Protection against malware",
        "description": "Protection against malware shall be implemented and supported by appropriate user awareness.",
        "questions": enrichQuestions([
          "Whether your organisation created a formal policy for managing Malware?",
          "Is the Antimalware solution implemented on all systems?",
          "Is the antimalware solution configured to perform periodic scans?",
          "Is the antimalware solution configured to get signature updates on regular basis?",
          "Is the antimalware solution configured to send alerts to system administrators upon identifying malware?",
          "Is there a process in place for detecting malicious websites?"
        ])
      },
      {
        "id": "A.8.8",
        "title": "8.8 Management of technical vulnerabilities",
        "description": "Information about technical vulnerabilities of information systems in use shall be obtained, the organization’s exposure to such vulnerabilities shall be evaluated and appropriate measures shall be take",
        "questions": enrichQuestions([
          "Are the Roles and responsibilities pertaining to vulnerability monitoring, vulnerability risk assessment, patching defined?",
          "Is the scope and frequency of technical vulnerability assessments defined?",
          "Is there a process to rate the vulnerabilities as Critical, High, Medium and Low?",
          "Are the remediation timelines defined as per the vulnerability ratings?",
          "Is there a formal process to install patches for remediating vulnerabilities?",
          "Are we testing and evaluating the patches before they are installed?"
        ])
      },
      {
        "id": "A.8.9",
        "title": "8.9 Configuration management",
        "description": "Configurations, including security configurations, of hardware, software, services and networks shall be established, documented, implemented, monitored and reviewed.",
        "questions": enrichQuestions([
          "Whether your organisation has a policy and procedure in place for documenting the configurations of hardware, software and network devices?",
          "Is there a proper role and ownership assigned to individuals for managing configuration on device?",
          "Whether organisation follows a standardised template for hardening hardware's and softwares?",
          "Does organisation have appropriate mechanism in place to review system, hardware updates at regular intervals and any current security threats to ensure optimal performance?"
        ])
      },
      {
        "id": "A.8.10",
        "title": "8.10 Information deletion",
        "description": "Information stored in information systems, devices or in any other storage media shall be deleted when no longer required.",
        "questions": enrichQuestions([
          "Does your organisation have policy that covers maintenance activities related to deletion and destruction of data and or IT assets including the utilisation of specialised software and liaison with vendors specialising in data and device deletion?",
          "Whether organisation regularly identifies data which is no longer in use and needs to be removed to prevent from unauthorised access or misuse?",
          "When employing specialised deletion vendor, whether sufficient evidence is obtained (via documentation) that the deletion has been performed?"
        ])
      },
      {
        "id": "A.8.11",
        "title": "8.11 Data masking",
        "description": "Data masking shall be used in accordance with the organization’s topic-specific policy on access control and other related topic-specific policies, and business requirements, taking applicable legislation into consideration",
        "questions": enrichQuestions([
          "Whether the organisation has a policy and procedure in place to ensure anonymization or pseudonymization of data for protection of data as per legal and regulatory requirements?",
          "Process in place to discover how masked data is accessed?",
          "Whether data masking policy and procedure includes requirements such as implementing masking techniques, restricting access, and following legal requirements."
        ])
      },
      {
        "id": "A.8.12",
        "title": "8.12 Data leakage prevention",
        "description": "Data leakage prevention measures shall be applied to systems, networks and any other devices that process, store or transmit sensitive information",
        "questions": enrichQuestions([
          "Has the organisation defined a procedure in place to reduce the risks of data leakage from emails, inward outward file transfer and USB devices?",
          "Has the organisation established proper measures to ensure data is organised according to industry standards to assign different levels of risk?",
          "Has organisation setup proper authorisation methods?",
          "Whether the data in back up and all sensitive data is encrypted?",
          "Whether organisation has implemented gateway security and leakage retention measures to protect against external influences?",
          "Has the organization identified monitoring channels for identifying data leakage?"
        ])
      },
      {
        "id": "A.8.13",
        "title": "8.13 Information backup",
        "description": "Backup copies of information, software and systems shall be maintained and regularly tested in accordance with the agreed topic-specific policy on backup.",
        "questions": enrichQuestions([
          "Has organisation got approved policy and procedure for managing backup of data on devices, storage media, cloud, DB and servers?",
          "How often the servers and configuration data are getting backed up ?",
          "Whether the backed up data are restored and checked at regular intervals.",
          "Whether the results of restorations are recorded?",
          "Whether backup plan is updated on regular basis?",
          "Has the organization defined the backup restoration testing frequency?"
        ])
      },
      {
        "id": "A.8.14",
        "title": "8.14 Redundancy of information processing facilities",
        "description": "Information processing facilities shall be implemented with redundancy sufficient to meet availability requirements",
        "questions": enrichQuestions([
          "Has the organisation have a policy and procedure in place to ensure data processed through any ICT technology, physical facility, software is duplicated to ensure availability in event of disruption?",
          "Has organisation considered geographically disparate locations when outsourcing data services (file storage/data centre amenities)",
          "Whether redundancy is in place for all systems to ensure availability of information processing facility"
        ])
      },
      {
        "id": "A.8.15",
        "title": "8.15 Logging",
        "description": "Logs that record activities, exceptions, faults and other relevant events shall be produced, stored, protected and analysed",
        "questions": enrichQuestions([
          "Do you have a process to review security audit logs in timely and act upon threats ?",
          "Are appropriate event logs maintained and regularly reviewed?",
          "Whether logging facilities protected against tampering and unauthorised access?",
          "Whether system admin /operator activities logged and reviewed regularly?",
          "Whether NTP services are deployed and systems are synced with the NTP services",
          "Whether log archives are maintained ?",
          "How log collection and aggregating from different network ,security , servers , DB, Identity systems and applications is managed?"
        ])
      },
      {
        "id": "A.8.16",
        "title": "8.16 Monitoring activities",
        "description": "Networks, systems and applications shall be monitored for anomalous behaviour and appropriate actions taken to evaluate potential information security incidents.",
        "questions": enrichQuestions([
          "Whether company has a policy and procedure in place to suspect events which should be reported to relevant personnel in order to maintain the network integrity and improve business continuity",
          "Has the organization established a baseline for normal working conditions to identify anomalies in the network?"
        ])
      },
      {
        "id": "A.8.17",
        "title": "8.17 Clock synchronization",
        "description": "The clocks of information processing systems used by the organization shall be synchronized to approved time sources",
        "questions": enrichQuestions([
          "Has the organization identified reputed time source?",
          "Whether all devices are in sync with this NTP server hosted in organisation",
          "Is there a process to restrict access to time data in the organization?",
          "Is there a process to identify and monitor all changes to NTP systems?"
        ])
      },
      {
        "id": "A.8.18",
        "title": "8.18 Use of privileged utility programs",
        "description": "The use of utility programs that can be capable of overriding system and application controls shall be restricted and managed.",
        "questions": enrichQuestions([
          "Whether organisation has defined list of utility programs?",
          "Does organisation has procedure in place to identify, authorise and authenticate using utility programs?",
          "Whether ad hoc utility programs are used? If yes, the approval process for the same.",
          "Details of logging for utility program"
        ])
      },
      {
        "id": "A.8.19",
        "title": "8.19 Installation of software on operational systems",
        "description": "Procedures and measures shall be implemented to securely manage software installation on operational systems",
        "questions": enrichQuestions([
          "Policy and procedure in place for software installation and to upgrade existing software’s",
          "List of whitelisted software approved by management to be used in organisation",
          "Audit logs maintained for changes carried out?",
          "Change management procedure, policy for installing/upgrading new software’s",
          "Sample change management tickets raised for such installation and upgradation of software’s"
        ])
      },
      {
        "id": "A.8.20",
        "title": "8.20 Networks security",
        "description": "Networks and network devices shall be secured, managed and controlled to protect information in systems and applications",
        "questions": enrichQuestions([
          "Does the organisation have a approved copy of the network diagram?",
          "Network asset inventory for the organisation?",
          "Whether logging and monitoring of network equipment’s in place?",
          "Details of network configuration files storage and their backup?",
          "What is the encryption controls deployed for data in transit?",
          "Is there a Procedure in place for authenticating network devices?"
        ])
      },
      {
        "id": "A.8.21",
        "title": "8.21 Security of network services",
        "description": "Security mechanisms, service levels and service requirements of network services shall be identified, implemented and monitored",
        "questions": enrichQuestions([
          "Policy and procedure in place for network security management?",
          "Procdeure for updating the OS patches, NW OS?",
          "Details of approved individuals who can make changes to network ?",
          "Details of SIEM,DLP.SOAR,IDS,IPS implemented?",
          "Is there a procedure in place to access network devices?"
        ])
      },
      {
        "id": "A.8.22",
        "title": "8.22 Segregation of networks",
        "description": "Groups of information services, users and information systems shall be segregated in the organization’s networks.",
        "questions": enrichQuestions([
          "What security controls are implemented to ensure Segregation of access for production, testing and development environment?",
          "How is the network segmented and how is the access monitored to different segments of network?"
        ])
      },
      {
        "id": "A.8.23",
        "title": "8.23 Web filtering",
        "description": "Access to external websites shall be managed to reduce exposure to malicious content.",
        "questions": enrichQuestions([
          "Are the Web filtering rules implemented to permit access to specific websites only?",
          "Whether there is an approved list of high risk website/content category",
          "are the controls implemented to block malicious content from being downloaded(Eg.Web proxy, email gateway, ant phishing module, EDR ?"
        ])
      },
      {
        "id": "A.8.24",
        "title": "8.24 Use of cryptography",
        "description": "Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented",
        "questions": enrichQuestions([
          "Has organisation got an cryptography policy in place?",
          "How are the cryptographic keys accessed, stored and safeguarded?",
          "Is the Inventory of cryptography keys and certificates used maintained?",
          "Is there a process defined to decide the encryption key strength and encryption algorithm?",
          "Is the crypto period defined for all encryption keys?"
        ])
      },
      {
        "id": "A.8.25",
        "title": "8.25 Secure development life cycle",
        "description": "Rules for the secure development of software and systems shall be established and applied",
        "questions": enrichQuestions([
          "Does the organization have a Secure application development policy?",
          "Are security requirements considered in all phases of development?",
          "Is there any secure coding guidelines used for development?",
          "Does the organization have secure source code repositories?",
          "Does the organization maintain version controlling on source code?"
        ])
      },
      {
        "id": "A.8.26",
        "title": "8.26 Application security requirements",
        "description": "Information security requirements shall be identified, specified and approved when developing or acquiring applications",
        "questions": enrichQuestions([
          "Is there a process to ensure identify all information security requirements when developing or acquiring applications?",
          "Are the legal, statutory and regulatory requirements considered during application development",
          "Are the privacy requirements considered during application development?"
        ])
      },
      {
        "id": "A.8.27",
        "title": "8.27 Secure system architecture and engineering principles",
        "description": "Principles for engineering secure systems shall be established, documented, maintained and applied to any information system development activities",
        "questions": enrichQuestions([
          "Documented standards, evidence for engineering secure system and system architecture",
          "Whether Secure Engineering guidelines include methods of user authentication, secure session control, data validation, and measures against known threats?",
          "Procedure in place for validating the practises, standards of service provider/third parties so they are in line with secure engineering protocols"
        ])
      },
      {
        "id": "A.8.28",
        "title": "8.28 Secure coding",
        "description": "Secure coding principles shall be applied to software development",
        "questions": enrichQuestions([
          "Details of Secure Development policy and procedures",
          "Threat and vulnerability process",
          "Tools for secure code development if any",
          "Reports on Secure code review, SAST,DAST",
          "Whether development team is regularly trained on real world threats",
          "Whether secure coding takes into account details on attack surface and OWASP Top 10 Vulnerabilities"
        ])
      },
      {
        "id": "A.8.29",
        "title": "8.29 Security testing in development and acceptance",
        "description": "Security testing processes shall be defined and implemented in the development life cycle.",
        "questions": enrichQuestions([
          "Whether user authentication, access restrictions and use of cryptographic techniques tested?",
          "Whether organisation tests the secure configs of OS , firewalls and other components",
          "Whether the organisation has a test plan defined, documented and implemented?",
          "Whether organization carriers out VA , if yes the frequency and reports of the same",
          "Whether organisation conducts PT, if yes the frequency and the reports of the same",
          "Whether organisation tests their DB for their security"
        ])
      },
      {
        "id": "A.8.30",
        "title": "8.30 Outsourced development",
        "description": "The organization shall direct, monitor and review the activities related to outsourced system development.",
        "questions": enrichQuestions([
          "Whether licensing , code ownership and IPR related to outsourced development in place?",
          "Does organisation have contractual requirements for secure design, coding and testing practises",
          "Whether provision for threat modelling considered by external developers?",
          "Whether UAT is done and approved",
          "Details of software ESCROW in place",
          "Details of organisation conducting an audit on third party in place?"
        ])
      },
      {
        "id": "A.8.31",
        "title": "8.31 Separation of development, test and production environments",
        "description": "Development, testing and production environments shall be separated and secured",
        "questions": enrichQuestions([
          "Whether organisation has segregated environment for application (Development, test and production)",
          "Access control list for each environment and review of the same.",
          "Privilege user access management process in place",
          "Patch, Backup management process in place",
          "VAPT detailed reports",
          "Details of web application security"
        ])
      },
      {
        "id": "A.8.32",
        "title": "8.32 Change management",
        "description": "Changes to information processing facilities and information systems shall be subject to change management procedures.",
        "questions": enrichQuestions([
          "Whether organisation has a change management policy and procedure?",
          "Is there a formal change request process?",
          "Are the change Impact assessment, testing and roll back plan defined for all changes?",
          "Are the changes approved before implementation?",
          "Is there a process to manage emergency changes?"
        ])
      },
      {
        "id": "A.8.33",
        "title": "8.33 Test information",
        "description": "Test information shall be appropriately selected, protected and managed",
        "questions": enrichQuestions([
          "Whether organisation applies same access control procedures to test and production environments?",
          "Details of approval if prod data is coped to testing environment?",
          "Sample of data used in testing, development and production environment?",
          "Does organisation have defined the data management process and guidelines in place"
        ])
      },
      {
        "id": "A.8.34",
        "title": "8.34 Protection of information systems during audit testing",
        "description": "Audit tests and other assurance activities involving assessment of operational systems shall be planned and agreed between the tester and appropriate management",
        "questions": enrichQuestions([
          "Whether organisation has a system audit and assurance plan?",
          "List of all privacy laws and regulations",
          "Details of the audit calendar and recent audit reports",
          "Procedure in place for protecting the PII data",
          "User awareness records of personal involving system operations"
        ])
      }
    ]
  }
];