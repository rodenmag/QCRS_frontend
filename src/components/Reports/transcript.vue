<template>
  <q-page padding class="q-pa-md justify-center">
    <div>
      <div v-if="print_prep" style="padding:20px; border: 1px solid black; width: 400px;">
        <div class="row q-gutter-md row items-start">
          <div class="col-12 col-md">
            <q-select
              dense
              v-model="selected_student"
              use-input
              label="Student"
              name="student_search"
              fill-input
              hide-selected
              square
              input-debounce="0"
              @filter="filterFn"
              class="text-primary"
              :options="student_list"
            >
              <template v-slot:append>
                <q-icon color="black" name="search" />
              </template>
            </q-select>
          </div>
        </div>
        <br>
        <div class="row q-gutter-md row items-start">
          <div class="col-12 col-md">
            <q-input dense debounce="500" name="date_of_admission" type="text" v-model="transcript_data.date_of_admission" class="text-primary" label="Date of Admission">
              <template v-slot:append>
                <q-icon color="black" name="info" />
              </template>
            </q-input>
          </div>
        </div>
        <br>
        <div class="row q-gutter-md row items-start">
          <div class="col-12 col-md">
            <q-input dense debounce="500" name="year_graduated" type="text" v-model="transcript_data.year_graduated" class="text-primary" label="Year Graduated">
              <template v-slot:append>
                <q-icon color="black" name="info" />
              </template>
            </q-input>
          </div>
        </div>
        <br>
        <div class="row q-gutter-md row items-start">
          <div class="col-12 col-md">
            <q-input dense debounce="500" name="date_graduated" type="text" v-model="transcript_data.date_graduated" class="text-primary" label="Date Graduated">
              <template v-slot:append>
                <q-icon color="black" name="info" />
              </template>
            </q-input>
          </div>
        </div>
        <br>
        <div class="row q-gutter-md row items-start">
          <div class="col-12 col-md">
            <q-input dense debounce="500" name="special_order_number" type="text" v-model="transcript_data.special_order_number" class="text-primary" label="Date Graduated">
              <template v-slot:append>
                <q-icon color="black" name="info" />
              </template>
            </q-input>
          </div>
        </div>
        <br>
        <div class="row q-gutter-md row items-start">
          <div class="col-12 col-md">
            <q-input dense debounce="500" name="nstp_serial_number" type="text" v-model="transcript_data.nstp_serial_number" class="text-primary" label="Date Graduated">
              <template v-slot:append>
                <q-icon color="black" name="info" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="q-pa-md row justify-center">
          <q-btn color="negative" @click="print_prep=false"> SUBMIT </q-btn>
        </div>
      </div>
      <div v-else>
        <div id="printMe">
          <div class="page-header" style="text-align: center; font-family: Arial; font-size: 10px;">
            <table id="report" style="text-align: left; width: 100%;">
              <!-- tr>
                <td align="left">Name: <b> {{ transcript_data.name }} </b> </td>
              </tr>
              <tr>
                <td align="left">ID Number: <b> {{ transcript_data.id_number }} </b> </td>
                <td> Address: <b> Pagbilao, Quezon </b> </td>
              </tr -->
              <!-- tr>
                <td align="left">Date of Admission: <b> June 2015 </b> </td>
                <td> Admission Credential: <b> Form 138-A </b> </td>
              </tr>
              <tr>
                <td align="left">Secondary School: <b> Talipan National High School </b> </td>
                <td> Year Graduated: <b> 2011 </b> </td>
              </tr>
              <tr>
                <td align="left">Degree: <b> BSCS Specialized in Business Analytics </b> </td>
                <td> Date Graduated: <b> April 25, 2016 </b> </td>
              </tr>
              <tr>
                <td align="left">Special Order No. <b> 50-340101-0708 s. 2016 </b> </td>
              </tr>
              <tr>
                <td align="left">NSTP Serial No. <b> C-04-04404-16 </b> </td>
              </tr>
              <tr>
                <td align="left">Remarks: <b> Graduated: For Local Employment </b> </td>
              </tr -->
            </table>
          </div>

          <div class="page-footer" style="text-align: center; font-size: 9px; font-family: Arial;">
            <table id="report" style="text-align: left; width: 100%">
              <tr>
                <td align="left" style="font-size:12px; padding-left: 15px;"> One (1) unit credit is equivalent to one (1) hour lecture or three (3) </td>
              </tr>
              <tr>
                <td align="left" style="font-size:12px; padding-left: 15px;"> hours of laboratory work each week for the period of a term. </td>
              </tr>
              <br>
              <tr>
                <td align="left" style="font-size:12px; padding-left: 2px;"> OFFICIAL MARKS: </td>
              </tr>
              <tr>
                <td align="left" style="font-size:12px; padding-left: 55px;"> 5 - Outstanding; 4.75 - Excellent; 4.5 - Very Good; 4.25 - Good; 4.0 - High Average; 3.75 - Average; 3.5 - Low Average; </td>
              </tr>
              <tr>
                <td align="left" style="font-size:12px; padding-left: 55px;"> 3.25 - Fair; 3.0 - Passed; F - Failed; INC - Incomplete; DRP - Dropped. </td>
              </tr>
            </table>
            <table id="report" style="text-align: left; width: 100%">
              <tr>
                <td align="left" style="font-size:12px;"> </td>
                <td align="center" style="font-size:12px;"> RICHARD LEANDRO Z. GARCIA, MBA </td>
              </tr>
              <tr>
                <td align="left" style="font-size:12px"> </td>
                <td align="center" style="font-family: Arial; font-size: 8px;"> Registrar </td>
              </tr>
              <br>
              <tr>
                <td align="left" style="font-size:12px; padding-left: 400px;"> </td>
                <td align="center" style="font-size:12px; border-bottom: 2px solid #000;"></td>
              </tr>
              <tr>
                <td align="left" style="font-size:12px; padding-left: 400px;"> </td>
                <td align="center" style="font-family: Arial; font-size: 8px;"> Date </td>
              </tr>
              <tr>
                <td align="left" style="font-family: Arial; font-size: 8px;"> prepared by:_________________________________Date:______________</td>
                <td align="center" style="font-size:12px;"> </td>
              </tr>
              <tr>
                <td align="left" style="font-family: Arial; font-size: 8px;"> verified by:___________________________________Date:______________</td>
                <td align="center" style="font-size:12px;"> </td>
              </tr>
              <br>
              <tr>
                <th align="left" style="font-family: Arial; font-size: 10px;"> Any erasure or alteration on this transcript invalidates the entire document.</th>
              </tr>
              <tr>
                <th align="left" style="font-family: Arial; font-size: 10px;"> This transcript is valid only if it bears the school seal.</th>
              </tr>
            </table>
          </div>

          <table style="width:100%">

            <thead>
              <tr>
                <td>
                  <!--place holder for the fixed-position header-->
                  <!-- div class="page-header-space"></div -->
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <!--*** CONTENT GOES HERE ***-->
                  <div class="page" style="font-family: Arial; font-size: 10px; margin-top: 103px;">
                    <table id="report" style="text-align: left; width: 100%; font-family: Arial; font-size: 10px;">
                      <tr>
                        <td align="left">Name: <b> {{ transcript_data.name }} </b> </td>
                      </tr>
                      <tr>
                        <td align="left">ID Number: <b> {{ transcript_data.id_number }} </b> </td>
                        <td> Address: <b> {{ transcript_data.address }} </b> </td>
                      </tr>
                      <tr>
                        <td align="left">Date of Admission: <b> {{ transcript_data.date_of_admission }} </b> </td>
                        <td> Admission Credential: <b> {{ transcript_data.admission_credential }} </b> </td>
                      </tr>
                      <tr>
                        <td align="left">Secondary School: <b> {{ transcript_data.secondary_school }} </b> </td>
                        <td> Date Graduated: <b> {{ transcript_data.year_graduated }} </b> </td>
                      </tr>
                      <tr>
                        <td align="left">Degree: <b> {{ transcript_data.degree }} </b> </td>
                        <td> Date Graduated: <b> {{ transcript_data.date_graduated }} </b> </td>
                      </tr>
                      <tr>
                        <td align="left">Special Order No. <b> {{ transcript_data.special_order_number }} </b> </td>
                      </tr>
                      <tr>
                        <td align="left">NSTP Serial No. <b> {{ transcript_data.nstp_serial_number }} </b> </td>
                      </tr>
                      <tr>
                        <td align="left">Remarks: <b> {{ transcript_data.remarks }} </b> </td>
                      </tr>
                    </table>
                    <br>
                    <table style="text-align: left; width:100%; border-collapse: collapse;">
                      <tr>
                        <td align="left" style="padding-left:0px;"></td>
                        <td align="center" style="letter-spacing:0px; border: 2px solid;" colspan="2"> S
                        <b style="visibility:hidden"> ---- </b>U
                        <b style="visibility:hidden"> --- </b> B
                        <b style="visibility:hidden"> ---- </b> J
                        <b style="visibility:hidden"> ---- </b> E
                        <b style="visibility:hidden"> ---- </b> C
                        <b style="visibility:hidden"> ---- </b> T
                        <b style="visibility:hidden"> ---- </b> S </td>
                        <td align="center" colspan="2" style="font-family: Arial; font-size: 9px; border: 2px solid;"> GRADES </td>
                        <td align="left" style="padding-right:0px"></td>
                      </tr>
                      <tr>
                        <td align="center" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> SUBJECT CODE </td>
                        <td align="center" colspan="2" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> DESCRIPTIVE TITLE </td>
                        <td align="center" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> FINAL </td>
                        <td align="center" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> REMOVAL </td>
                        <td align="center" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> CREDITS </td>
                      </tr>
                      <!-- First Year First Trimester 11-->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> First Year </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> A.Y. 2015-2016, First Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr v-for="(x) in first_year_first_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;">  {{ x.subject_name }} </td>
                        <td align="center" > {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.unit }} </td>
                      </tr>
                      <!-- First Year Second Trimester 12-->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2"  style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> A.Y. 2015-2016, Second Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2"  style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr v-for="(x) in first_year_second_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;">  {{ x.subject_name }} </td>
                        <td align="center" > {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.unit }} </td>
                      </tr>
                      <!-- First Year Third Trimester 13-->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2"  style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> A.Y. 2015-2016, Third Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2"  style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr v-for="(x) in first_year_third_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;">  {{ x.subject_name }} </td>
                        <td align="center" > {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.unit }} </td>
                      </tr>
                      <!-- Second Year 1st Trimester 21-->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> Second Year </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> A.Y. 2016-2017, First Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <!-- tr v-for="(x, index) in second_year_first_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;" v-if="index!==3"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;" v-if="index!==3">  {{ x.subject_name }} </td>
                        <td align="center"  v-if="index!==3"> {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;" v-if="index!==3"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;" v-if="index!==3"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;" v-if="index!==3"> {{ x.unit }} </td>

                        <td align="center" style="border-left: 2px solid; border-bottom: 2px solid;" v-if="index===3"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px; border-bottom: 2px solid;" v-if="index===3">  {{ x.subject_name }} </td>
                        <td align="center" v-if="index===3"  style="border-bottom: 2px solid;"> {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid; border-bottom: 2px solid;" v-if="index===3"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid; border-bottom: 2px solid;" v-if="index===3"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid; border-bottom: 2px solid;" v-if="index===3"> {{ x.unit }} </td>
                      </tr -->
                      <tr v-for="(x, index) in second_year_first_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;" v-if="index!==3"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;" v-if="index!==3">  {{ x.subject_name }} </td>
                        <td align="center"  v-if="index!==3"> {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;" v-if="index!==3"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;" v-if="index!==3"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;" v-if="index!==3"> {{ x.unit }} </td>

                        <td align="center" style="border-left: 2px solid; border-bottom: 2px solid;" v-if="index===x.length-1"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px; border-bottom: 2px solid;" v-if="index===x.length-1">  {{ x.subject_name }} </td>
                        <td align="center" v-if="index===x.length-1"  style="border-bottom: 2px solid;"> {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid; border-bottom: 2px solid;" v-if="index===x.length-1"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid; border-bottom: 2px solid;" v-if="index===x.length-1"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid; border-bottom: 2px solid;" v-if="index===x.length-1"> {{ x.unit }} </td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-top: 2px solid;"></th>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <td align="center" style="border-top: 2px solid;"></td>
                      </tr>
                    </table>
                      <!-- header -->
                    <table style="text-align: left; width:100%; border-collapse: collapse;">
                      <tr>
                        <td align="left">Name: <b> {{ transcript_data.name }} </b> </td>
                      </tr>
                      <tr>
                        <td align="left">ID Number: <b> {{ transcript_data.id_number }} </b> </td>
                      </tr>
                    </table>
                    <br><br>
                    <table style="text-align: left; width:100%; border-collapse: collapse; height:100vh">
                      <tr style="padding-bottom: 50px;">
                        <td align="left" style="padding-left:0px;"></td>
                        <td align="center" style="letter-spacing:0px; border: 2px solid;" colspan="2"> S
                        <b style="visibility:hidden"> ---- </b>U
                        <b style="visibility:hidden"> --- </b> B
                        <b style="visibility:hidden"> ---- </b> J
                        <b style="visibility:hidden"> ---- </b> E
                        <b style="visibility:hidden"> ---- </b> C
                        <b style="visibility:hidden"> ---- </b> T
                        <b style="visibility:hidden"> ---- </b> S </td>
                        <td align="center" colspan="2" style="font-family: Arial; font-size: 9px; border: 2px solid;"> GRADES </td>
                        <td align="left" style="padding-right:0px"></td>
                      </tr>
                      <tr>
                        <td align="center" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> SUBJECT CODE </td>
                        <td align="center" colspan="2" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> DESCRIPTIVE TITLE </td>
                        <td align="center" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> FINAL </td>
                        <td align="center" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> REMOVAL </td>
                        <td align="center" style="font-family: Arial; font-size: 7.5px; border: 2px solid;"> CREDITS </td>
                      </tr>
                      <!-- Second Year 2nd Trimester 22-->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> A.Y. 2016-2017, Second Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr v-for="(x) in second_year_second_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;">  {{ x.subject_name }} </td>
                        <td align="center" > {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.unit }} </td>
                      </tr>
                      <!-- 23 -->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> A.Y. 2016-2017, Third Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr v-for="(x) in second_year_third_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;">  {{ x.subject_name }} </td>
                        <td align="center" > {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.unit }} </td>
                      </tr>
                      <!-- Third Year 1st Trimester 31-->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> Third Year </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> A.Y. 2016-2017, First Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr v-for="(x) in third_year_first_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;">  {{ x.subject_name }} </td>
                        <td align="center" > {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.unit }} </td>
                      </tr>
                      <!-- 32 -->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-left: 2px solid; border-right: 2px solid;"> A.Y. 2016-2017, Second Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr v-for="(x) in third_year_second_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;">  {{ x.subject_name }} </td>
                        <td align="center" > {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.unit }} </td>
                      </tr>
                      <!-- 33 -->
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2"> A.Y. 2016-2017, Third Trimester </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden; border-left: 2px solid; border-right: 2px solid;"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr v-for="(x) in third_year_third_trimester" :key="x.id">
                        <td align="center" style="border-left: 2px solid;"> {{ x.subject_code }} </td>
                        <td align="left" style="border-left: 2px solid; padding-left:4px;">  {{ x.subject_name }} </td>
                        <td align="center" > {{ x.percentage_grade }} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.numerical_grade}} </td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"> {{ x.unit }} </td>
                      </tr>
                      <tr>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <th align="left" colspan="2" style="visibility:hidden"> ------- </th>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                        <td align="center" style="border-left: 2px solid; border-right: 2px solid;"></td>
                      </tr>
                      <tr>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-top: 2px solid;"></th>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <td align="center" style="border-top: 2px solid;"></td>
                      </tr>
                      <!-- tr>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <th align="left" colspan="2" style="border-top: 2px solid;"></th>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <td align="center" style="border-top: 2px solid;"></td>
                        <td align="center" style="border-top: 2px solid;"></td>
                      </tr -->
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td>
                  <!--place holder for the fixed-position footer-->
                  <div class="page-footer-space"></div>
                </td>
              </tr>
            </tfoot>

          </table>
        </div>
      </div>
    </div>
    <!-- q-btn color="negative" v-print="'#printMe'"> Print </q-btn -->
    <div class="row q-gutter-md row items-start" v-if="!print_prep">
      <q-page-sticky position="bottom-right" :offset="[90, 15]">
        <q-btn fab icon="arrow_back" @click="print_prep=true" color="primary">
          <q-tooltip content-class="bg-black" :offset="[10, 10]">
            Back
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </div>
    <div class="row q-gutter-md row items-start" v-if="!print_prep">
      <q-page-sticky position="bottom-right" :offset="[30, 15]">
        <q-btn fab icon="print" v-print="'#printMe'" color="negative">
          <q-tooltip content-class="bg-black" :offset="[10, 10]">
            Print
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </div>
    <div class="row q-gutter-md row items-start">
      <q-page-sticky position="bottom-left" :offset="[30, 15]">
        <q-btn fab icon="keyboard_backspace" color="primary" to="/ReportManagement">
          <q-tooltip content-class="bg-black" :offset="[10, 10]">
            Back
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
// import "ag-grid-community/dist/styles/ag-grid.css"
// import "ag-grid-community/dist/styles/ag-theme-alpine.css"
// import { AgGridVue } from "ag-grid-vue"
export default {
  data () {
    // :disable="disable_save"
    return {
      print_prep: true,
      transcript_data: {
        name: '',
        id_number: '',
        date_of_admission: '',
        secondary_school: '',
        degree: '',
        special_order_number: '50-340101-0708 s. 2016',
        nstp_serial_number: '50-340101-0708 s. 2016',
        remarks: 'Graduated: For Local Employment',
        address: '',
        admission_credential: 'Form 138-A',
        year_graduated: '',
        date_graduated: ''
      },
      selected_student: [],
      student_list: [],
      first_year_first_trimester: [],
      first_year_second_trimester: [],
      first_year_third_trimester: [],
      second_year_first_trimester: [],
      second_year_second_trimester: [],
      second_year_third_trimester: [],
      third_year_first_trimester: [],
      third_year_second_trimester: [],
      third_year_third_trimester: []
    }
  },
  async created () {
    var self = this
    self.student_list = []
    await self.$api.get('student_management/student_list/').then(function (response) {
      self.stringOptions = response.data
      self.student_list = self.stringOptions
    }).catch(function (error) {
      self.error = error
    })
  },
  computed: {
  },
  watch: {
    selected_student: function () {
      var self = this
      self.transcript_data.name = self.selected_student.last_name + ', ' + self.selected_student.first_name
      self.transcript_data.id_number = self.selected_student.college_student_id
      self.transcript_data.secondary_school = self.selected_student.junior_high_school
      self.transcript_data.degree = self.selected_student.course
      self.transcript_data.address = self.selected_student.city_province
      self.transcript_proc()
    }
  },
  methods: {
    transcript_proc () {
      var self = this
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=1&trimester=1').then(function (response) {
        self.first_year_first_trimester = response.data
      }).catch(function (error) {
        self.error = error
      })
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=1&trimester=2').then(function (response) {
        self.first_year_second_trimester = response.data
        console.log(response.data)
      }).catch(function (error) {
        self.error = error
      })
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=1&trimester=3').then(function (response) {
        self.first_year_third_trimester = response.data
      }).catch(function (error) {
        self.error = error
      })
      // second year
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=2&trimester=1').then(function (response) {
        self.second_year_first_trimester = response.data
      }).catch(function (error) {
        self.error = error
      })
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=2&trimester=2').then(function (response) {
        self.second_year_second_trimester = response.data
      }).catch(function (error) {
        self.error = error
      })
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=2&trimester=3').then(function (response) {
        self.second_year_third_trimester = response.data
      }).catch(function (error) {
        self.error = error
      })
      // third year
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=3&trimester=1').then(function (response) {
        self.third_year_first_trimester = response.data
      }).catch(function (error) {
        self.error = error
      })
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=3&trimester=2').then(function (response) {
        self.third_year_second_trimester = response.data
      }).catch(function (error) {
        self.error = error
      })
      self.$api.get('grade_management/grades_filter/?student_id=' + self.selected_student.id + '&year=3&trimester=3').then(function (response) {
        self.third_year_third_trimester = response.data
      }).catch(function (error) {
        self.error = error
      })
    },
    printWindow: function () {		
	    window.print();
    },
    filterFn (val, update, abort) {
      var self = this
      update(() => {
        const needle = val.toLowerCase()
        self.student_list = self.stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  components: {
    // 'printing': require('components/Print/Printing.vue').default
  }
}
</script>
<style>
/* Styles go here */

.page-header, .page-header-space {
  height: 150px;
}

.page-footer, .page-footer-space {
  height: 280px;
}

/* div.page-footer:before {
  counter-increment: page;
  counter-increment: pages;
  content: "Page " counter(page);
  position: absolute;
  bottom: 0px;
  right: 15px;
  z-index: 999;
  padding: 2px 12px;
  border-right: 2px solid #23b8e7;
  font-size: 12px;
} */


.page-footer {
  position: fixed;
  bottom: 0mm; /* 83 */
  width: 100%;
  /* border-top: 1px solid red; /* for demo */
  /* background: yellow; /* for demo */
}

.page-header {
  position: fixed;
  top: 0mm; /* 20 */
  width: 100%;
  /* border-bottom: 1px solid red; /* for demo */
  /* background: yellow; /* for demo */
}

.page {
  /* position: fixed; */
  /* background: red; /* for demo */
  page-break-after: always;
}

@page {
  margin: 15mm;
}

@media print {
  .page { display:block; page-break-before: always;}
  table { page-break-after:auto; }
  tr    { page-break-inside:avoid; page-break-after:auto; }
  td    { page-break-inside:avoid; page-break-after:auto; }
  /* thead {display: table-header-group;} */
  tfoot {display: table-footer-group;}
  
  button {display: none;}
  
  body {margin: 0;}
}
</style>
<style lang="sass">
$title-color: $grey-14
.doc-card-title
  margin-left: -24px
  padding: 2px 10px 2px 24px
  background: $title-color
  color: $grey-2
  position: relative
  border-radius: 3px 5px 5px 0
  &:after
    content: ''
    position: absolute
    top: 100%
    left: 0
    width: 0
    height: 0
    border: 0 solid transparent
    border-top-color: scale-color($title-color, $lightness: -15%)
    border-width: 9px 0 0 11px

.doc-example
  &__toolbar
    background: white
    color: $grey-8
    > .q-btn
      color: $grey-7
  &__tabs
    background: $grey-3
    color: $grey-7
  &--dark
    .doc-example__toolbar
      background: $grey-10
      color: #fff
      > .q-btn
        color: $grey-3
    .doc-example__separator
      background-color: $grey-8
    .doc-example__tabs
      background: $grey-9
      color: $grey-5
  &__content
    position: relative
    &--scrollable
      height: 500px
</style>
