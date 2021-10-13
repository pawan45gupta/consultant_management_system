
from django.db import models


# Create your models here.
class Consultant(models.Model):
    consultant_name = models.CharField("Consultant Name",max_length=100)
    uid = models.CharField("UID", max_length=100)
    first_name = models.CharField("First Name",max_length=100)
    last_name = models.CharField("Last Name", max_length=100)
    eda_vendor = models.CharField("EDA Vendor",max_length=100)
    consultant_type = models.CharField("Consultant Type",max_length=100)
    technology_focus = models.CharField("Technology Focus",max_length=100)
    access_type = models.CharField("Access Type",max_length=100)
    consultant_start_date = models.DateField("Consultant Start Date")
    proposed_end_date = models.DateField("Proposed End Date")
    qcm_consultant_current_status = models.CharField("QCM Consultant Current Status",max_length=100)
    off_board_consultant = models.CharField("Off-Board Consultant (Y/N)",max_length=100,blank=True,null=True)
    current_vpn_status = models.CharField("VPN Current Status",max_length=100)
    consultant_location = models.CharField("Consultant Location",max_length=100,blank=True,null=True)
    current_consultant_sponsor = models.CharField("Current Consultant Sponsor", max_length=100)
    project = models.CharField("Project",max_length=100,blank=True,null=True)
    justificaiton_for_remaining_onboarded = models.TextField("Justification for Consultant to Remain Onboarded (Specify Deliverables/Scope)", max_length=1000,blank=True,null=True)
    approval_for_justification = models.CharField("GCAD Sr. Director Approval",max_length=100,blank=True,null=True)
    approval_comments = models.CharField("Comments",max_length=100,blank=True,null=True)
    
    def __str__(self):
        return self.eda_vendor + " - " + self.consultant_name + " - " + str(self.consultant_start_date) + " - " + str(self.proposed_end_date)

    class Meta:
        ordering = ["id"]
