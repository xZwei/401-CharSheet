package com.example.jonto.charactersheettest;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

public class DnDActivity extends AppCompatActivity {

    Spinner dndRaceSpinner = (Spinner) findViewById(R.id.dndRaceSpinner);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dn_d);
    }

}
