import React from "react";

export default function BlueBar({
  ep,
  setEp,
  name,
}: {
  ep: number;
  name: String;
  setEp: React.Dispatch<React.SetStateAction<number>>;
  setEpName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEp = parseInt(event.target.value);
    setEp(selectedEp);
  };
  return (
    <>
      <div className="w-full bg-[#0055a0] text-white  h-100 flex justify-between p-5">
        <h2 className="text-2xl font-bold text-white">Εκλογές 2023</h2>
        <select
          onChange={handleSelectChange}
          value={ep}
          className=" text-black w-40 md:w-48 lg:w-64 p-1 bg-white border-2 border-primary hover:border-primary-light focus:border-primary-light rounded outline-none"
        >
          <option value="99999">Επικράτεια</option>
          <option value="38">Α Αθηνών</option>
          <option value="60">Β1 Βόρειου Τομέα Αθηνών</option>
          <option value="61">Β2 Δυτικού Τομέα Αθηνών</option>
          <option value="62">Β3 Νότιου Τομέα Αθηνών</option>
          <option value="40">Α Πειραιώς</option>
          <option value="41">Β Πειραιώς</option>
          <option value="63">Α Ανατολικής Αττικής</option>
          <option value="64">Β Δυτικής Αττικής</option>
          <option value="30">Αιτωλοακαρνανίας</option>
          <option value="44">Αργολίδος</option>
          <option value="45">Αρκαδίας</option>
          <option value="19">Άρτας</option>
          <option value="31">Αχαΐας</option>
          <option value="36">Βοιωτίας</option>
          <option value="17">Γρεβενών</option>
          <option value="4">Δράμας</option>
          <option value="52">Δωδεκανήσου</option>
          <option value="1">Έβρου</option>
          <option value="37">Ευβοίας</option>
          <option value="34">Ευρυτανίας</option>
          <option value="29">Ζακύνθου</option>
          <option value="32">Ηλείας</option>
          <option value="12">Ημαθίας</option>
          <option value="55">Ηρακλείου</option>
          <option value="20">Θεσπρωτίας</option>
          <option value="6">Α Θεσσαλονίκης</option>
          <option value="7">Β Θεσσαλονίκης</option>
          <option value="18">Ιωαννίνων</option>
          <option value="5">Καβάλας</option>
          <option value="25">Καρδίτσας</option>
          <option value="16">Καστοριάς</option>
          <option value="26">Κέρκυρας</option>
          <option value="28">Κεφαλληνίας</option>
          <option value="10">Κιλκίς</option>
          <option value="15">Κοζάνης</option>
          <option value="43">Κορινθίας</option>
          <option value="51">Κυκλάδων</option>
          <option value="47">Λακωνίας</option>
          <option value="22">Λάρισας</option>
          <option value="56">Λασιθίου</option>
          <option value="48">Λέσβου</option>
          <option value="27">Λευκάδας</option>
          <option value="23">Μαγνησίας</option>
          <option value="46">Μεσσηνίας</option>
          <option value="3">Ξάνθης</option>
          <option value="11">Πέλλας</option>
          <option value="13">Πιερίας</option>
          <option value="21">Πρέβεζας</option>
          <option value="54">Ρεθύμνης</option>
          <option value="2">Ροδόπης</option>
          <option value="50">Σάμου</option>
          <option value="8">Σερρών</option>
          <option value="24">Τρικάλων</option>
          <option value="33">Φθιώτιδας</option>
          <option value="14">Φλώρινας</option>
          <option value="35">Φωκίδας</option>
          <option value="9">Χαλκιδικής</option>
          <option value="53">Χανίων</option>
          <option value="49">Χίου</option>
          <option value="57">Εξωτερικού</option>
        </select>
      </div>
      <div className="w-full bg-white text-[#0055a0] h-100 flex justify-between p-5">
        <p className="text-2xl font-bold">{name}</p>
      </div>
    </>
  );
}
