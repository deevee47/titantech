// "use client"
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/hooks/use-toast";
// import { createUser } from "@/actions/user";
// import { Upload } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";

// const OnboardCustomer = () => {
//   const [loading, setLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     companyName: "",
//     streetAddress: "",
//     city: "",
//     state: "",
//     pincode: "",
//     aadharFront: null as File | null,
//     aadharBack: null as File | null,
//     panCard: null as File | null,
//     investmentAmount: "",
//     customerNote: "",
//   });

//   const [fileNames, setFileNames] = useState({
//     aadharFront: "",
//     aadharBack: "",
//     panCard: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
//         toast({
//           title: "Invalid file type",
//           description: "Please upload only PDF or image files",
//           variant: "destructive",
//         });
//         return;
//       }
//       setUserData((prev) => ({
//         ...prev,
//         [field]: file,
//       }));
//       setFileNames((prev) => ({
//         ...prev,
//         [field]: file.name,
//       }));
//     }
//   };

//   const uploadFile = async (file: File): Promise<string> => {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       const data = await response.json();
//       // Store the public_id instead of the URL
//       return data.public_id;
//     } catch (error) {
//       console.error("Upload error:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       console.log("Starting submission with userData:", userData); // Debug log

//       // Upload files first
//       const [aadharFrontUrl, aadharBackUrl, panCardUrl] = await Promise.all([
//         userData.aadharFront
//           ? uploadFile(userData.aadharFront)
//           : Promise.resolve(""),
//         userData.aadharBack
//           ? uploadFile(userData.aadharBack)
//           : Promise.resolve(""),
//         userData.panCard ? uploadFile(userData.panCard) : Promise.resolve(""),
//       ]);

//       console.log("Uploaded files:", {
//         aadharFrontUrl,
//         aadharBackUrl,
//         panCardUrl,
//       }); // Debug log

//       const formattedAddress = `${userData.streetAddress}, ${userData.city}, ${userData.state} - ${userData.pincode}`;

//       // Log the data being sent to createUser
//       console.log("Sending to createUser:", {
//         ...userData,
//         address: formattedAddress,
//         aadharFrontUrl,
//         aadharBackUrl,
//         panCardUrl,
//         paymentDone: false,
//         investmentAmount: parseFloat(userData.investmentAmount),
//       });

//       //Server Action Call
//       const result = await createUser({
//         ...userData,
//         address: formattedAddress,
//         aadharFrontUrl,
//         aadharBackUrl,
//         panCardUrl,
//         paymentDone: false,
//         investmentAmount: parseFloat(userData.investmentAmount),
//       });

//       console.log("CreateUser result:", result); // Debug log

//       if (result.success) {
//         toast({
//           title: "Success",
//           description: "User created successfully",
//         });
//         // Reset form...
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || "Failed to create user",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Submission error:", error); // Detailed error log
//       toast({
//         title: "Error",
//         description:
//           error instanceof Error ? error.message : "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const renderPersonalInfo = () => (
//     <div className="space-y-6">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="firstName" className="text-gray-300">
//             First Name
//           </Label>
//           <Input
//             id="firstName"
//             name="firstName"
//             value={userData.firstName}
//             onChange={handleInputChange}
//             placeholder="John"
//             className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="lastName" className="text-gray-300">
//             Last Name
//           </Label>
//           <Input
//             id="lastName"
//             name="lastName"
//             value={userData.lastName}
//             onChange={handleInputChange}
//             placeholder="Doe"
//             className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="phone" className="text-gray-300">
//             Phone Number
//           </Label>
//           <Input
//             id="phone"
//             name="phone"
//             value={userData.phone}
//             onChange={handleInputChange}
//             placeholder="1234567890"
//             className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="email" className="text-gray-300">
//             Email
//           </Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             value={userData.email}
//             onChange={handleInputChange}
//             placeholder="john@example.com"
//             className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="companyName" className="text-gray-300">
//           Company Name
//         </Label>
//         <Input
//           id="companyName"
//           name="companyName"
//           value={userData.companyName}
//           onChange={handleInputChange}
//           placeholder="Company Ltd."
//           className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//         />
//       </div>

//       <div className="space-y-4">
//         <Label className="text-gray-300">Address Details</Label>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Textarea
//               id="streetAddress"
//               name="streetAddress"
//               value={userData.streetAddress}
//               onChange={handleInputChange}
//               placeholder="Street Address"
//               className="h-20 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Input
//                 id="city"
//                 name="city"
//                 value={userData.city}
//                 onChange={handleInputChange}
//                 placeholder="City"
//                 className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//               />
//             </div>
//             <div className="space-y-2">
//               <Input
//                 id="state"
//                 name="state"
//                 value={userData.state}
//                 onChange={handleInputChange}
//                 placeholder="State"
//                 className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//               />
//             </div>
//           </div>
//           <div className="w-1/2">
//             <Input
//               id="pincode"
//               name="pincode"
//               value={userData.pincode}
//               onChange={handleInputChange}
//               placeholder="PIN Code"
//               className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderDocumentsAndInvestment = () => (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="aadharFront" className="text-gray-300">
//             Aadhar Card (Front)
//           </Label>
//           <div className="relative">
//             <Input
//               id="aadharFront"
//               type="file"
//               accept=".pdf,image/*"
//               onChange={(e) => handleFileChange(e, "aadharFront")}
//               className="hidden"
//             />
//             <Button
//               onClick={() => document.getElementById("aadharFront")?.click()}
//               variant="outline"
//               className="w-full bg-white/5 backdrop-blur-sm border-dashed border-white/20 text-white hover:bg-white/10 py-8"
//             >
//               <div className="flex flex-col items-center gap-2">
//                 <Upload className="w-6 h-6" />
//                 <span>{fileNames.aadharFront || "Upload Aadhar Front"}</span>
//               </div>
//             </Button>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="aadharBack" className="text-gray-300">
//             Aadhar Card (Back)
//           </Label>
//           <div className="relative">
//             <Input
//               id="aadharBack"
//               type="file"
//               accept=".pdf,image/*"
//               onChange={(e) => handleFileChange(e, "aadharBack")}
//               className="hidden"
//             />
//             <Button
//               onClick={() => document.getElementById("aadharBack")?.click()}
//               variant="outline"
//               className="w-full bg-white/5 backdrop-blur-sm border-dashed border-white/20 text-white hover:bg-white/10 py-8"
//             >
//               <div className="flex flex-col items-center gap-2">
//                 <Upload className="w-6 h-6" />
//                 <span>{fileNames.aadharBack || "Upload Aadhar Back"}</span>
//               </div>
//             </Button>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="panCard" className="text-gray-300">
//             PAN Card
//           </Label>
//           <div className="relative">
//             <Input
//               id="panCard"
//               type="file"
//               accept=".pdf,image/*"
//               onChange={(e) => handleFileChange(e, "panCard")}
//               className="hidden"
//             />
//             <Button
//               onClick={() => document.getElementById("panCard")?.click()}
//               variant="outline"
//               className="w-full bg-white/5 backdrop-blur-sm border-dashed border-white/20 text-white hover:bg-white/10 py-8"
//             >
//               <div className="flex flex-col items-center gap-2">
//                 <Upload className="w-6 h-6" />
//                 <span>{fileNames.panCard || "Upload PAN Card"}</span>
//               </div>
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="investmentAmount" className="text-gray-300">
//           Investment Amount
//         </Label>
//         <Input
//           id="investmentAmount"
//           name="investmentAmount"
//           type="number"
//           value={userData.investmentAmount}
//           onChange={handleInputChange}
//           placeholder="0.00"
//           className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="customerNote" className="text-gray-300">
//           Customer's Note
//         </Label>
//         <Textarea
//           id="customerNote"
//           name="customerNote"
//           value={userData.customerNote}
//           onChange={handleInputChange}
//           placeholder="Tell us anything we should know about you..."
//           className="h-20 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
//         />
//       </div>
//     </div>
//   );

//   const renderTermsAndConditions = () => (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <div className="h-64 overflow-y-auto p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
//           <div className="space-y-4 text-gray-300">
//             <h3 className="font-semibold">1. Introduction</h3>
//             <p>
//               These Terms and Conditions govern your use of our investment
//               services. By proceeding, you agree to be bound by these terms.
//             </p>

//             <h3 className="font-semibold">2. Investment Risks</h3>
//             <p>
//               All investments carry risks. Past performance is not indicative of
//               future results. You should carefully consider your investment
//               objectives, risks, and capabilities before investing.
//             </p>

//             <h3 className="font-semibold">3. KYC Requirements</h3>
//             <p>
//               You agree to provide accurate and up-to-date documentation for
//               Know Your Customer (KYC) verification. This includes your Aadhar
//               card, PAN card, and other required documents.
//             </p>

//             <h3 className="font-semibold">4. Privacy Policy</h3>
//             <p>
//               We collect and process your personal information in accordance
//               with our Privacy Policy. Your information will be handled securely
//               and used only for legitimate business purposes.
//             </p>

//             <h3 className="font-semibold">5. Investment Terms</h3>
//             <p>
//               The minimum investment amount may vary based on the investment
//               product. Returns are subject to market conditions and are not
//               guaranteed.
//             </p>

//             <h3 className="font-semibold">6. Withdrawal Policy</h3>
//             <p>
//               Withdrawals are subject to applicable lock-in periods and
//               processing times. Early withdrawals may incur penalties as
//               specified in the investment product terms.
//             </p>

//             <h3 className="font-semibold">7. Communication</h3>
//             <p>
//               You agree to receive communications from us regarding your
//               investment, including but not limited to statements, updates, and
//               regulatory notices.
//             </p>

//             <h3 className="font-semibold">8. Governing Law</h3>
//             <p>
//               These terms are governed by applicable local and national laws.
//               Any disputes will be resolved in accordance with these laws.
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="terms"
//             checked={acceptedTerms}
//             onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
//             className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
//           />
//           <Label htmlFor="terms" className="text-gray-300">
//             I have read and agree to the Terms and Conditions
//           </Label>
//         </div>
//       </div>
//     </div>
//   );

//   const stepTitles = {
//     1: "Personal Information",
//     2: "Documents & Investment",
//     3: "Terms & Conditions",
//   };

//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden">
//         <div
//           className="absolute w-96 h-96 rounded-full bg-purple-600/30 blur-3xl"
//           style={{
//             top: "20%",
//             left: "60%",
//             transform: "translate(-50%, -50%)",
//             animation: "blob1 7s infinite ease-in-out",
//           }}
//         />
//         <div
//           className="absolute w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"
//           style={{
//             top: "60%",
//             left: "30%",
//             transform: "translate(-50%, -50%)",
//             animation: "blob2 8s infinite ease-in-out",
//           }}
//         />
//       </div>

//       <div className="relative z-10 py-8 px-4">
//         <Card className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/10">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-3xl font-bold text-center text-white">
//               {stepTitles[currentStep as keyof typeof stepTitles]}
//             </CardTitle>
//             <div className="flex justify-center space-x-2">
//               {[1, 2, 3].map((step) => (
//                 <div
//                   key={step}
//                   className={`w-2 h-2 rounded-full ${
//                     step === currentStep
//                       ? "bg-gradient-to-r from-pink-500 to-purple-500"
//                       : "bg-gray-600"
//                   }`}
//                 />
//               ))}
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {currentStep === 1 && renderPersonalInfo()}
//             {currentStep === 2 && renderDocumentsAndInvestment()}
//             {currentStep === 3 && renderTermsAndConditions()}

//             <div className="flex justify-between space-x-4 pt-4">
//               <Button
//                 onClick={prevStep}
//                 disabled={currentStep === 1}
//                 variant="outline"
//                 className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 transition-colors px-8 py-6 text-sm font-normal disabled:opacity-30"
//               >
//                 Previous
//               </Button>
//               {currentStep < 3 ? (
//                 <Button
//                   onClick={nextStep}
//                   className="w-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal"
//                 >
//                   Next
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={handleSubmit}
//                   disabled={loading || !acceptedTerms}
//                   className="w-full bg-white text-black hover:bg-gray-100 transition-colors px-8 py-6 text-sm font-normal disabled:opacity-50"
//                 >
//                   {loading ? "Processing..." : "Complete"}
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <style jsx global>{`
//         @keyframes blob1 {
//           0%,
//           100% {
//             transform: translate(-50%, -50%) scale(1);
//           }
//           50% {
//             transform: translate(-50%, -50%) scale(1.2);
//           }
//         }
//         @keyframes blob2 {
//           0%,
//           100% {
//             transform: translate(-50%, -50%) scale(1.2);
//           }
//           50% {
//             transform: translate(-50%, -50%) scale(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OnboardCustomer;
