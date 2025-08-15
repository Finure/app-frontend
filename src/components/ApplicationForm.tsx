import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
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
  age: number;
  income: number;
  employed: boolean;
  credit_score: number;
  loan_amount: number;
}

function validateFormData(data: FormData): string[] {
  const errors: string[] = [];
  if (!Number.isInteger(data.age) || data.age < 18 || data.age > 100)
    errors.push("Age must be an integer between 18 and 100.");
  if (!Number.isFinite(data.income) || data.income <= 0)
    errors.push("Income must be a number > 0.");
  if (!Number.isInteger(data.credit_score) || data.credit_score < 300 || data.credit_score > 850)
    errors.push("Credit score must be an integer between 300 and 850.");
  if (!Number.isFinite(data.loan_amount) || data.loan_amount <= 0)
    errors.push("Loan amount must be a number > 0.");
  return errors;
}

const ApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    age: 0,
    income: 0,
    employed: false,
    credit_score: 0,
    loan_amount: 0,
  });

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof FormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
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
        id: uuidv4(), // generate UUIDv4 here
        age: Number(formData.age),
        income: Number(formData.income),
        employed: Boolean(formData.employed),
        credit_score: Number(formData.credit_score),
        loan_amount: Number(formData.loan_amount),
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
        age: 0,
        income: 0,
        employed: false,
        credit_score: 0,
        loan_amount: 0,
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
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", parseInt(e.target.value) || 0)}
                    min={18}
                    max={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income ($)</Label>
                  <Input
                    id="income"
                    type="number"
                    value={formData.income}
                    onChange={(e) => handleInputChange("income", parseFloat(e.target.value) || 0)}
                    min={0}
                    step="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credit_score">Credit Score</Label>
                  <Input
                    id="credit_score"
                    type="number"
                    value={formData.credit_score}
                    onChange={(e) => handleInputChange("credit_score", parseInt(e.target.value) || 0)}
                    min={300}
                    max={850}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan_amount">Loan Amount ($)</Label>
                  <Input
                    id="loan_amount"
                    type="number"
                    value={formData.loan_amount}
                    onChange={(e) => handleInputChange("loan_amount", parseFloat(e.target.value) || 0)}
                    min={0}
                    step="100"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="employed"
                    checked={formData.employed}
                    onCheckedChange={(checked) => handleCheckboxChange("employed", !!checked)}
                  />
                  <Label htmlFor="employed">Currently Employed</Label>
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
