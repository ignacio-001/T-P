const from = 'kkmkittu36@gmail.com';
const baseUrl = 'http://127.0.0.1:8080';
const email_signature = '<br><br>With Regards.<br><br>Dr. Gauri Dhopavkar<br>Dean, Training & Placement<br>YCCE Nagpur<br>+911234567890';

exports.getEmailOpts = (data, mailType) => {

    switch (mailType) {

        case 'sendOTP':
            return {
                from : from,
                to:  data.college_email,
                subject: 'Login Request : T&P, YCCE Nagpur',
                text: 'Hello '+ data.student_name + 'We have received a login request for your account.Please find the below OTP to proceed further With Regards, Dr. Gauri Dhopavkar',
                html: 'Hello <strong>'+ data.student_name + '</strong>,<br><br>A sign in attempt to T&P Portal requires further verification to prevent unauthorized access to your account. To complete the sign in, enter the verification code on the T&P Portal.<br><br>Verification Code: ' + data.login_otp + email_signature
            }
            break;

        case 'forgotPassword':
            return {
                from: from,
                to: data.college_email,
                subject: 'Reset Password Request : Placement Cell, YCCE Nagpur',
                text: 'Hello '+ data.student_name + 'You requested for the reset password.Please find the below link Reset password With Regards, Prof. Mahendar Choudhary',
                html: 'Hello <strong>'+ data.student_name + '</strong>,<br><br>You requested for the reset password. Please find the below link<br><br><a href="' + baseUrl + "/forgotPassword/" + data.token + '">Reset password</a>'+ email_signature
            }
            break;

        case 'passwordUpdated':
            return {
                from: from,
                to: data.college_email,
                subject: 'Password Updated : T&P Cell, YCCE Nagpur',
                text: 'Hello '+ data.student_name + 'Your password has been successfully updated.With Regards, Dr. Gauri Dhopavker',
                html: 'Hello <strong>'+ data.student_name + '</strong>,<br><br>Your password has been successfully updated.'+ email_signature
            }
            break;

        case 'approveInterviewExperience':
            return {
                from: from,
                to: data.author_id + '@mnit.ac.in',
                subject: 'Yay! We have published your article ' + data.title,
                text: 'Hello '+ data.author_name + 'Thanks for sharing your interview process and thoughts with us With Regards, Dr. Gauri Dhopavkar',
                html: 'Hello <strong>'+ data.author_name + '</strong>,<br><br>Thanks for sharing your interview process and thoughts with us to help others. We have published your interview experience after a few modifications. We wish you luck for the future! Please find the link below -<br><br><a href="' + baseUrl + "/experience/" + data._id + '">' + data.title + ' </a>'+ email_signature
            };
            break;

        case 'companyAdded':
            return {
                from: from,
                to: data.email,
                subject: 'Company Specific Registration: ' + data.company_name,
                text: 'Dear Students,\nCompany Name: '+data.company_name+'\nProfile: '+data.job_profile+'\nJob Location: '+data.posting_locatioin+'\nDeadline: '+data.deadline_date+'\nWith Regards, Prof. Mahendar Choudhary',
                html: 'Dear Students,<br><br><table border="1|0" style="border-collapse: collapse"><tr><td><strong>Company Name:</strong></td><td>'+data.company_name+'</td></tr><tr><td><strong>Company URL:</strong></td><td>'+data.company_website_url+'</td></tr><tr><td><strong>Organization Type:</strong></td><td>'
                +data.organization_type+'</td></tr><tr><td><strong>Industry Sector:</strong></td><td>'+data.industry_sector+'</td></tr><tr><td><strong>About Company:</strong></td><td>'+data.about_company+'</td></tr><tr><td><strong>Profile:</strong></td><td>'+data.job_profile+'</td></tr><tr><td><strong>Passout Batch:</strong></td><td>'
                +data.passout_batch+'</td></tr><tr><td><strong>Recruitment Type:</strong></td><td>'+data.recruitment+'</td></tr><tr><td><strong>Duration:</strong></td><td>'+data.duration+'</td></tr><tr><td><strong>Job Location:</strong></td><td>'+data.posting_location+'</td></tr><tr><td><strong>Job Description:</strong></td><td>'
                +data.job_description+'</td></tr><tr><td><strong>Min CGPA:</strong></td><td>'+data.min_cgpa+'</td></tr><tr><td><strong>Min 10%:</strong></td><td>'+data.min_10_percent+'</td></tr><tr><td><strong>Min 12%:</strong></td><td>'+data.min_12_percent+'</td></tr><tr><td><strong>Medical Requirement:</strong></td><td>'
                +data.medical_requirement+'</td></tr><tr><td><strong>Service Agreement:</strong></td><td>'+data.service_agreement+'</td></tr><tr><td><strong>Duration of Agreement:</strong></td><td>'+data.service_agreement_duration+'</td></tr><tr><td><strong>Other Eligibility:</strong></td><td>'
                +data.other_eligibility+'</td></tr><tr><td><strong>Package:</strong></td><td>UG: '+data.package.UG.ctc+'<br>MTech: '+data.package.MTech.ctc+'<br>MPlan: '+data.package.MPlan.ctc+'<br>MSc: '+data.package.MSc.ctc+'<br>MBA: '+data.package.MBA.ctc+'</td></tr><tr><td><strong>Company Accommodation:</strong></td><td>'
                +data.company_accommodation+'</td></tr><tr><td><strong>Other Facility:</strong></td><td>'+data.other_facility+'</td></tr><tr><td><strong>Deadline:</strong></td><td>'+data.deadline_date+'</td></tr></table><br><a href="'+baseUrl+"/company/"+data._id+'"><strong>Link to register</strong></a><br><br>'+email_signature
            };
            break;

        default:
            return {}
    }

}

exports.getSMSOpts = (data, smsType) => {

    switch (smsType) {

        case 'addCoordinator':
            return 'Hi '+ data.name.split(" ")[0] + ',' + '\n' + '\n' +
                'Welcome to T&P Cell. Login with College ID ' + data.college_email.toUpperCase().split("@")[0] + '-PTP' + ' and '+ data.alternate_contact_no + ' as password on portal.' +
                '\n' + '\n' + 'Thanks' + '\n' + 'YCCE Nagpur'
            break;

        default:
            return {}
    }

}
