import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/api/apply`;

interface FormData {
  code_gender: string;
  flag_own_car: string;
  flag_own_realty: string;
  cnt_children: number;
  amt_income_total: number;
  name_income_type: string;
  name_education_type: string;
  name_family_status: string;
  name_housing_type: string;
  days_birth: number;
  days_employed: number;
  flag_mobil: number;
  flag_work_phone: number;
  flag_phone: number;
  flag_email: number;
  occupation_type: string;
  cnt_fam_members: number;
}

function validateFormData(data: FormData): string[] {
  const errors: string[] = [];

  if (!["M", "F"].includes(data.code_gender))
    errors.push("Gender is required (M/F)");
  if (!["Y", "N"].includes(data.flag_own_car))
    errors.push("Own car (Y/N) is required");
  if (!["Y", "N"].includes(data.flag_own_realty))
    errors.push("Own realty (Y/N) is required");
  if (!Number.isInteger(data.cnt_children) || data.cnt_children < 0)
    errors.push("Children must be integer ≥ 0");
  if (
    typeof data.amt_income_total !== "number" ||
    isNaN(data.amt_income_total) ||
    data.amt_income_total <= 0
  )
    errors.push("Annual income must be a number > 0");
  if (!data.name_income_type) errors.push("Income type is required");
  if (data.name_income_type.length > 50)
    errors.push("Income type max length is 50");
  if (!data.name_education_type) errors.push("Education type is required");
  if (data.name_education_type.length > 50)
    errors.push("Education type max length is 50");
  if (!data.name_family_status) errors.push("Family status is required");
  if (data.name_family_status.length > 50)
    errors.push("Family status max length is 50");
  if (!data.name_housing_type) errors.push("Housing type is required");
  if (data.name_housing_type.length > 50)
    errors.push("Housing type max length is 50");
  if (!Number.isInteger(data.days_birth) || data.days_birth >= 0)
    errors.push("Birth days must be a negative integer");
  if (!Number.isInteger(data.days_employed) || data.days_employed > 0)
    errors.push("Employment days must be zero or negative integer");
  if (![0, 1].includes(data.flag_mobil))
    errors.push("Mobile flag must be 0 or 1");
  if (![0, 1].includes(data.flag_work_phone))
    errors.push("Work phone flag must be 0 or 1");
  if (![0, 1].includes(data.flag_phone))
    errors.push("Home phone flag must be 0 or 1");
  if (![0, 1].includes(data.flag_email))
    errors.push("Email flag must be 0 or 1");
  if (!data.occupation_type) errors.push("Occupation type is required");
  if (data.occupation_type.length > 50)
    errors.push("Occupation type max length is 50");
  if (
    typeof data.cnt_fam_members !== "number" ||
    isNaN(data.cnt_fam_members) ||
    data.cnt_fam_members < 1
  )
    errors.push("Family members must be a number ≥ 1");

  return errors;
}

const ApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    code_gender: "",
    flag_own_car: "",
    flag_own_realty: "",
    cnt_children: 0,
    amt_income_total: 0,
    name_income_type: "",
    name_education_type: "",
    name_family_status: "",
    name_housing_type: "",
    days_birth: 0,
    days_employed: 0,
    flag_mobil: 1,
    flag_work_phone: 0,
    flag_phone: 0,
    flag_email: 0,
    occupation_type: "",
    cnt_fam_members: 0,
  });

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof FormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked ? 1 : 0 }));
  };

  const calculateDaysFromAge = (age: number) => {
    return Math.floor(-age * 365.25);
  };

  const calculateDaysFromEmploymentYears = (years: number) => {
    return Math.floor(-years * 365.25);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        id: Math.floor(Math.random() * 10000000), // Generate random ID
      };

      const errors = validateFormData(payload);
      if (errors.length > 0) {
        toast({
          title: "Validation Error",
          description: errors.join(" "),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      console.log("VITE_API_URL is:", API_BASE_URL);
      console.log("Submitting payload to FastAPI:", payload);
      console.log("Submitting payload to FastAPI:", payload);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Application Submitted!",
        description:
          "Your credit card application has been successfully submitted",
        variant: "default",
      });

      // Reset form
      setFormData({
        code_gender: "",
        flag_own_car: "",
        flag_own_realty: "",
        cnt_children: 0,
        amt_income_total: 0,
        name_income_type: "",
        name_education_type: "",
        name_family_status: "",
        name_housing_type: "",
        days_birth: 0,
        days_employed: 0,
        flag_mobil: 1,
        flag_work_phone: 0,
        flag_phone: 0,
        flag_email: 0,
        occupation_type: "",
        cnt_fam_members: 0,
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            Apply for Your PremiumCard
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete the form below to start your application process
          </p>
        </div>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">
              Application Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.code_gender}
                      onValueChange={(value) =>
                        handleInputChange("code_gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      onChange={(e) =>
                        handleInputChange(
                          "days_birth",
                          calculateDaysFromAge(parseInt(e.target.value) || 0),
                        )
                      }
                      min="18"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="children">Number of Children</Label>
                    <Input
                      type="number"
                      value={formData.cnt_children}
                      onChange={(e) =>
                        handleInputChange(
                          "cnt_children",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      min="0"
                      max="20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="family_members">Family Members</Label>
                    <Input
                      type="number"
                      value={formData.cnt_fam_members}
                      onChange={(e) =>
                        handleInputChange(
                          "cnt_fam_members",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      min="1"
                      max="20"
                      step="0.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="family_status">Marital Status</Label>
                    <Select
                      value={formData.name_family_status}
                      onValueChange={(value) =>
                        handleInputChange("name_family_status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single / not married">
                          Single
                        </SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Civil marriage">
                          Civil Marriage
                        </SelectItem>
                        <SelectItem value="Separated">Separated</SelectItem>
                        <SelectItem value="Widow">Widow/Widower</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level</Label>
                    <Select
                      value={formData.name_education_type}
                      onValueChange={(value) =>
                        handleInputChange("name_education_type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lower secondary">
                          Lower Secondary
                        </SelectItem>
                        <SelectItem value="Secondary / secondary special">
                          Secondary
                        </SelectItem>
                        <SelectItem value="Incomplete higher">
                          Incomplete Higher
                        </SelectItem>
                        <SelectItem value="Higher education">
                          Higher Education
                        </SelectItem>
                        <SelectItem value="Academic degree">
                          Academic Degree
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Employment & Income */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Employment & Income
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Income ($)</Label>
                    <Input
                      type="number"
                      value={formData.amt_income_total}
                      onChange={(e) =>
                        handleInputChange(
                          "amt_income_total",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income_type">Income Type</Label>
                    <Select
                      value={formData.name_income_type}
                      onValueChange={(value) =>
                        handleInputChange("name_income_type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select income type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Working">Working</SelectItem>
                        <SelectItem value="State servant">
                          State Servant
                        </SelectItem>
                        <SelectItem value="Commercial associate">
                          Commercial Associate
                        </SelectItem>
                        <SelectItem value="Pensioner">Pensioner</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employment_years">Years Employed</Label>
                    <Input
                      type="number"
                      placeholder="Years at current job"
                      onChange={(e) =>
                        handleInputChange(
                          "days_employed",
                          calculateDaysFromEmploymentYears(
                            parseFloat(e.target.value) || 0,
                          ),
                        )
                      }
                      min="0"
                      max="50"
                      step="0.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select
                      value={formData.occupation_type}
                      onValueChange={(value) =>
                        handleInputChange("occupation_type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High skill tech staff">
                          High Skill Tech Staff
                        </SelectItem>
                        <SelectItem value="Managers">Managers</SelectItem>
                        <SelectItem value="Core staff">Core Staff</SelectItem>
                        <SelectItem value="Laborers">Laborers</SelectItem>
                        <SelectItem value="Sales staff">Sales Staff</SelectItem>
                        <SelectItem value="Medicine staff">
                          Medicine Staff
                        </SelectItem>
                        <SelectItem value="Security staff">
                          Security Staff
                        </SelectItem>
                        <SelectItem value="Cooking staff">
                          Cooking Staff
                        </SelectItem>
                        <SelectItem value="Cleaning staff">
                          Cleaning Staff
                        </SelectItem>
                        <SelectItem value="Private service staff">
                          Private Service Staff
                        </SelectItem>
                        <SelectItem value="Low-skill Laborers">
                          Low-skill Laborers
                        </SelectItem>
                        <SelectItem value="Accountants">Accountants</SelectItem>
                        <SelectItem value="Drivers">Drivers</SelectItem>
                        <SelectItem value="Waiters/barmen staff">
                          Waiters/Barmen Staff
                        </SelectItem>
                        <SelectItem value="Secretaries">Secretaries</SelectItem>
                        <SelectItem value="Realty agents">
                          Realty Agents
                        </SelectItem>
                        <SelectItem value="HR staff">HR Staff</SelectItem>
                        <SelectItem value="IT staff">IT Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Assets & Housing */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Assets & Housing
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="own_car">Do you own a car?</Label>
                    <Select
                      value={formData.flag_own_car}
                      onValueChange={(value) =>
                        handleInputChange("flag_own_car", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Y">Yes</SelectItem>
                        <SelectItem value="N">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="own_realty">Do you own real estate?</Label>
                    <Select
                      value={formData.flag_own_realty}
                      onValueChange={(value) =>
                        handleInputChange("flag_own_realty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Y">Yes</SelectItem>
                        <SelectItem value="N">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="housing_type">Housing Type</Label>
                    <Select
                      value={formData.name_housing_type}
                      onValueChange={(value) =>
                        handleInputChange("name_housing_type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select housing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="House / apartment">
                          House / Apartment
                        </SelectItem>
                        <SelectItem value="Rented apartment">
                          Rented Apartment
                        </SelectItem>
                        <SelectItem value="With parents">
                          With Parents
                        </SelectItem>
                        <SelectItem value="Municipal apartment">
                          Municipal Apartment
                        </SelectItem>
                        <SelectItem value="Office apartment">
                          Office Apartment
                        </SelectItem>
                        <SelectItem value="Co-op apartment">
                          Co-op Apartment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mobile"
                      checked={formData.flag_mobil === 1}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("flag_mobil", !!checked)
                      }
                    />
                    <Label htmlFor="mobile">I have a mobile phone</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="work_phone"
                      checked={formData.flag_work_phone === 1}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("flag_work_phone", !!checked)
                      }
                    />
                    <Label htmlFor="work_phone">I have a work phone</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="phone"
                      checked={formData.flag_phone === 1}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("flag_phone", !!checked)
                      }
                    />
                    <Label htmlFor="phone">I have a home phone</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email"
                      checked={formData.flag_email === 1}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("flag_email", !!checked)
                      }
                    />
                    <Label htmlFor="email">I have an email address</Label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="hero"
                size="lg"
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;
