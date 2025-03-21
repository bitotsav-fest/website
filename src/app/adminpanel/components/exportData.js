import React, { useState } from "react";
import { saveAs } from "file-saver";
import { utils, writeFile } from "xlsx";
import { Parser } from "json2csv";
import { FileJson, FileText, FileSpreadsheet, Download, X, Eye } from "lucide-react";

const ExportData = ({ responseData, isDataFetched }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState("teams"); // "teams", "registrars", or "details"

  if (!isDataFetched || !responseData) return null;

  // Format data for export
  const formatDataForExport = () => {
    return {
      eventName: responseData.eventName,
      eventClub: responseData.eventClub,
      eventVenue: responseData.eventVenue,
      eventTime: responseData.eventTime,
      teamsRegistered: responseData.teamsRegistered?.map(({ teamName, leaderName, leaderMobileNumber, rollNumber }) => ({
        teamName,
        leaderName,
        leaderMobileNumber,
        rollNumber,
      })) || [],
      eventRegistrarList: responseData.eventRegistrarList?.map(({ name, rollNumber, mobileNumber }) => ({
        name,
        rollNumber,
        mobileNumber,
      })) || [],
    };
  };

  const displayedData = formatDataForExport();
  const currentDateTime = new Date().toISOString().replace(/[:.]/g, "-");

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(displayedData, null, 2)], { type: "application/json" });
    saveAs(blob, `${responseData.eventName}_${currentDateTime}.json`);
  };

  const exportCSV = () => {
    const eventFields = ["eventName", "eventClub", "eventVenue", "eventTime"];
    const teamsFields = ["teamName", "leaderName", "leaderMobileNumber", "rollNumber"];
    const registrarFields = ["name", "rollNumber", "mobileNumber"];

    const eventParser = new Parser({ fields: eventFields });
    const teamsParser = new Parser({ fields: teamsFields });
    const registrarsParser = new Parser({ fields: registrarFields });

    const csvData =
      eventParser.parse([displayedData]) +
      "\n\nTeams Registered\n" +
      (displayedData.teamsRegistered?.length ? teamsParser.parse(displayedData.teamsRegistered) : "No teams registered") +
      "\n\nRegistrars\n" +
      (displayedData.eventRegistrarList?.length ? registrarsParser.parse(displayedData.eventRegistrarList) : "No registrars");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${responseData.eventName}_${currentDateTime}.csv`);
  };

  const exportExcel = () => {
    const wb = utils.book_new();

    const eventSheet = utils.json_to_sheet([
      {
        "Event Name": responseData.eventName,
        "Club": responseData.eventClub,
        "Venue": responseData.eventVenue,
        "Time": responseData.eventTime,
      },
    ]);
    utils.book_append_sheet(wb, eventSheet, "Event Details");

    const teamsSheet = utils.json_to_sheet(
      responseData.teamsRegistered?.map((team) => ({
        "Team Name": team.teamName,
        "Leader Name": team.leaderName,
        "Leader Contact": team.leaderMobileNumber,
        "Roll Number": team.rollNumber,
      })) || []
    );
    utils.book_append_sheet(wb, teamsSheet, "Teams Registered");

    const registrarsSheet = utils.json_to_sheet(
      responseData.eventRegistrarList?.map((registrar) => ({
        "Participant Name": registrar.name,
        "Roll Number": registrar.rollNumber,
        "Contact Number": registrar.mobileNumber,
      })) || []
    );
    utils.book_append_sheet(wb, registrarsSheet, "Registrars");

    writeFile(wb, `${responseData.eventName}_${currentDateTime}.xlsx`);
  };

  const colorClasses = {
    json: "bg-blue-500 hover:bg-blue-600",
    csv: "bg-green-500 hover:bg-green-600",
    excel: "bg-yellow-500 hover:bg-yellow-600",
    preview: "bg-purple-500 hover:bg-purple-600",
  };

  // Data Preview Component
  const DataPreview = () => {
    if (!previewOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#1A0B2E] border border-[#EFCA4E]/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-[#EFCA4E]/20 bg-gradient-to-r from-[#2D1E0F] to-[#1A0B2E]">
            <h2 className="text-2xl font-bold text-[#EFCA4E]">
              {previewType === "teams" ? "Teams Data Preview" : 
               previewType === "registrars" ? "Registrars Data Preview" : 
               "Event Details Preview"}
            </h2>
            <button 
              onClick={() => setPreviewOpen(false)}
              className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="overflow-auto p-4 flex-grow">
            {previewType === "details" && (
              <div className="bg-white/5 p-6 rounded-lg border border-[#EFCA4E]/20">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 text-[#EFCA4E] font-semibold">Event Name</td>
                      <td className="py-3 px-4 text-white">{responseData.eventName}</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 text-[#EFCA4E] font-semibold">Club</td>
                      <td className="py-3 px-4 text-white">{responseData.eventClub}</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 text-[#EFCA4E] font-semibold">Venue</td>
                      <td className="py-3 px-4 text-white">{responseData.eventVenue}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-[#EFCA4E] font-semibold">Time</td>
                      <td className="py-3 px-4 text-white">{responseData.eventTime}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            
            {previewType === "teams" && (
              <div className="bg-white/5 rounded-lg border border-[#EFCA4E]/20">
                {displayedData.teamsRegistered.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#2D1E0F]/50 text-[#EFCA4E]">
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">Team Name</th>
                        <th className="py-3 px-4 text-left">Leader Name</th>
                        <th className="py-3 px-4 text-left">Contact</th>
                        <th className="py-3 px-4 text-left">Roll Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedData.teamsRegistered.map((team, index) => (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                          <td className="py-3 px-4 text-white/70">{index + 1}</td>
                          <td className="py-3 px-4 text-white font-medium">{team.teamName}</td>
                          <td className="py-3 px-4 text-white/90">{team.leaderName}</td>
                          <td className="py-3 px-4 text-white/90">{team.leaderMobileNumber}</td>
                          <td className="py-3 px-4 text-white/90">{team.rollNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-white/50">No teams registered for this event</div>
                )}
              </div>
            )}
            
            {previewType === "registrars" && (
              <div className="bg-white/5 rounded-lg border border-[#EFCA4E]/20">
                {displayedData.eventRegistrarList.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#2D1E0F]/50 text-[#EFCA4E]">
                        <th className="py-3 px-4 text-left">#</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Roll Number</th>
                        <th className="py-3 px-4 text-left">Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedData.eventRegistrarList.map((registrar, index) => (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                          <td className="py-3 px-4 text-white/70">{index + 1}</td>
                          <td className="py-3 px-4 text-white font-medium">{registrar.name}</td>
                          <td className="py-3 px-4 text-white/90">{registrar.rollNumber}</td>
                          <td className="py-3 px-4 text-white/90">{registrar.mobileNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-white/50">No registrars for this event</div>
                )}
              </div>
            )}
          </div>
          
          <div className="border-t border-[#EFCA4E]/20 p-4 bg-gradient-to-r from-[#1A0B2E] to-[#2D1E0F] flex justify-between items-center">
            <div className="flex space-x-2">
              <button 
                onClick={() => setPreviewType("details")} 
                className={`px-4 py-2 rounded-md ${previewType === "details" ? "bg-[#EFCA4E] text-[#1A0B2E] font-medium" : "text-white/70 hover:bg-white/10"}`}
              >
                Event Details
              </button>
              <button 
                onClick={() => setPreviewType("teams")} 
                className={`px-4 py-2 rounded-md ${previewType === "teams" ? "bg-[#EFCA4E] text-[#1A0B2E] font-medium" : "text-white/70 hover:bg-white/10"}`}
              >
                Teams ({displayedData.teamsRegistered.length})
              </button>
              <button 
                onClick={() => setPreviewType("registrars")} 
                className={`px-4 py-2 rounded-md ${previewType === "registrars" ? "bg-[#EFCA4E] text-[#1A0B2E] font-medium" : "text-white/70 hover:bg-white/10"}`}
              >
                Registrars ({displayedData.eventRegistrarList.length})
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={exportJSON} 
                className="flex items-center space-x-1 py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FileJson size={16} /> <span>JSON</span>
              </button>
              <button 
                onClick={exportCSV} 
                className="flex items-center space-x-1 py-2 px-3 bg-green-500 text-white rounded hover:bg-green-600"
              >
                <FileText size={16} /> <span>CSV</span>
              </button>
              <button 
                onClick={exportExcel} 
                className="flex items-center space-x-1 py-2 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <FileSpreadsheet size={16} /> <span>Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DataPreview />
      <div className="rounded-xl bg-white/5 border border-[#EFCA4E]/20 p-4 mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h3 className="text-lg font-semibold text-[#EFCA4E] mb-4 sm:mb-0">Data Export Options</h3>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                setPreviewType("teams");
                setPreviewOpen(true);
              }}
              className={`text-white py-2 px-4 rounded flex items-center space-x-2 ${colorClasses.preview}`}
            >
              <Eye className="w-5 h-5" />
              <span>Preview Data</span>
            </button>
            
            {[
              { id: "json", label: "JSON", icon: <FileJson className="w-5 h-5" />, action: exportJSON },
              { id: "csv", label: "CSV", icon: <FileText className="w-5 h-5" />, action: exportCSV },
              { id: "excel", label: "Excel", icon: <FileSpreadsheet className="w-5 h-5" />, action: exportExcel },
            ].map(({ id, label, icon, action }) => (
              <button
                key={id}
                onClick={action}
                className={`text-white py-2 px-4 rounded flex items-center space-x-2 ${colorClasses[id]}`}
              >
                {icon}
                <span>Export as {label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-sm text-white/60">
          <p>
            Export your event data in different formats. The preview option allows you to review your data before exporting.
          </p>
        </div>
      </div>
    </>
  );
};

export default ExportData;